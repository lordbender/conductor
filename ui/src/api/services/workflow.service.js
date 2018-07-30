/* eslint-disable no-restricted-globals */
import identity from 'lodash/identity';
import moment from 'moment';
import filter from 'lodash/fp/filter';
import forEach from 'lodash/fp/forEach';
import map from 'lodash/fp/map';
import transform from 'lodash/transform';
import BaseService from './base.service';

const LOG_DATE_FORMAT = 'MM/DD/YY, HH:mm:ss:SSS';

class WorkflowService extends BaseService {
  async search(req) {
    const { freeText: reqFreeText = '', start: reqStart = '', h: reqH, q = '' } = req;

    const freeText = [];
    if (reqFreeText !== '') {
      freeText.push(reqFreeText);
    } else {
      freeText.push('*');
    }

    let h = '-1';
    if (reqH && reqH !== 'undefined' && reqH !== '') {
      h = reqH;
    }

    if (h !== '-1') {
      freeText.push(`startTime:[now-${h}h TO now]`);
    }

    let start = 0;
    if (!isNaN(reqStart)) {
      start = reqStart;
    }

    const url = `workflow/search?size=100&sort=startTime:DESC&freeText=${freeText.join(
      ' AND '
    )}&start=${start}&query=${q}`;

    const { results: hits, totalHits } = await this.get(url, req.token);

    return { result: { hits, totalHits } };
  }

  async searchByTask(req) {
    const { freeText: reqFreeText = '', start: reqStart = '', h: reqH, q = '' } = req;

    const freeText = [];
    if (reqFreeText !== '') {
      freeText.push(req.params.taskId);
    } else {
      freeText.push('*');
    }

    let h = '-1';
    if (reqH !== undefined && reqH !== 'undefined' && reqH !== '') {
      h = reqH;
    }
    if (h !== '-1') {
      freeText.push(`startTime:[now-${h}h TO now]`);
    }
    let start = 0;
    if (!isNaN(reqStart)) {
      start = reqStart;
    }

    const url = `search-by-tasks?size=100&sort=startTime:DESC&freeText=${freeText.join(' AND ')}&start=${start}`;
    const { results: hits, totalHits } = await this.get(url, req.token);

    return { result: { hits, totalHits } };
  }

  async getById(req, workflowId) {
    const { data } = await this.get(`${workflowId}workflow?includeTasks=true`, req.token);
    const meta = await this.get(`metadata/workflow/${data.workflowType}?version=${data.version}`, req.token);

    const subs = filter(identity)(
      map(task => {
        if (task.taskType === 'SUB_WORKFLOW') {
          const subWorkflowId = task.inputData && task.inputData.subWorkflowId;

          if (subWorkflowId != null) {
            return {
              name: task.inputData.subWorkflowName,
              version: task.inputData.subWorkflowVersion,
              referenceTaskName: task.referenceTaskName,
              subWorkflowId
            };
          }
        }
      })(data.tasks || [])
    );

    (data.tasks || []).forEach(task => {
      if (task.taskType === 'SUB_WORKFLOW') {
        const subWorkflowId = task.inputData && task.inputData.subWorkflowId;

        if (subWorkflowId != null) {
          subs.push({
            name: task.inputData.subWorkflowName,
            version: task.inputData.subWorkflowVersion,
            referenceTaskName: task.referenceTaskName,
            subWorkflowId
          });
        }
      }
    });

    const logs = map(task => Promise.all([task, this.get(`tasks/${task.taskId}/log`)]))(result.tasks);

    await Promise.all(logs).then(result => {
      forEach(([task, logs]) => {
        if (logs) {
          task.logs = map(({ createdTime, log }) => `${moment(createdTime).format(LOG_DATE_FORMAT)} : ${log}`)(logs);
        }
      })(result);
    });

    const promises = map(({ name, version, subWorkflowId, referenceTaskName }) =>
      Promise.all([
        referenceTaskName,
        this.get(`metadata/workflow/${name}?version=${version}`),
        this.get(`workflow/${subWorkflowId}?includeTasks=true`)
      ])
    )(subs);

    const subworkflows = await Promise.all(promises).then(result =>
      transform(
        result,
        (result, [key, meta, wfe]) => {
          result[key] = { meta, wfe };
        },
        {}
      )
    );

    return { result: data, meta, subworkflows };
  }
}

module.exports = WorkflowService;
