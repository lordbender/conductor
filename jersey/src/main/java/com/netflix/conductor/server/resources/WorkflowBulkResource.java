/**
 * Copyright 2016 Netflix, Inc.
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 *
 */
package com.netflix.conductor.server.resources;

import com.google.common.base.Preconditions;
import com.netflix.conductor.core.execution.WorkflowExecutor;
import com.netflix.conductor.server.common.BulkResponse;
import com.netflix.conductor.service.WorkflowBulkService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Synchronous Bulk API's to process workflows in batches
 */
@Api(value = "/workflow/bulk", produces = MediaType.APPLICATION_JSON, consumes = MediaType.APPLICATION_JSON, tags = "Workflow Bulk Management")
@Path("/workflow/bulk")
@Produces({ MediaType.APPLICATION_JSON })
@Consumes({ MediaType.APPLICATION_JSON })
@Singleton
public class WorkflowBulkResource {

    private static final int MAX_REQUEST_ITEMS = 1000;
    private final WorkflowBulkService workflowBulkService;

    @Inject
    public WorkflowBulkResource(WorkflowBulkService workflowBulkService) {
        this.workflowBulkService = workflowBulkService;
    }

    /**
     * Pause the list of workflows.
     * 
     * @param workflowIds
     * @return bulk response object containing a list of succeeded workflows and a
     *         list of failed ones with errors
     * @throws Exception
     */
    @PUT
    @Path("/pause")
    @ApiOperation("Pause the list of workflows")
    public BulkResponse pauseWorkflow(List<String> workflowIds) throws Exception {
        Preconditions.checkNotNull(workflowIds, "workflowIds list cannot be null.");
        Preconditions.checkArgument(workflowIds.size() < MAX_REQUEST_ITEMS,
                "Cannot process more than  %s  workflows.  Please use multiple requests", MAX_REQUEST_ITEMS);

        BulkResponse bulkResponse = new BulkResponse();
        for (String workflowId : workflowIds) {
            try {
                executor.pauseWorkflow(workflowId);
                bulkResponse.appendSuccessResponse(workflowId);
            } catch (Exception e) {
                bulkResponse.appendFailedResponse(workflowId, e.getMessage());
            }
        }
        return bulkResponse;
    }

    /**
     * Resume the list of workflows.
     * 
     * @param workflowIds
     * @return bulk response object containing a list of succeeded workflows and a
     *         list of failed ones with errors
     * @throws Exception
     */
    @PUT
    @Path("/resume")
    @ApiOperation("Resume the list of workflows")
    public BulkResponse resumeWorkflow(List<String> workflowIds) throws Exception {
        Preconditions.checkNotNull(workflowIds, "workflowIds list cannot be null.");
        Preconditions.checkArgument(workflowIds.size() < MAX_REQUEST_ITEMS,
                "Cannot process more than  %s  workflows.  Please use multiple requests", MAX_REQUEST_ITEMS);

        BulkResponse bulkResponse = new BulkResponse();
        for (String workflowId : workflowIds) {
            try {
                executor.resumeWorkflow(workflowId);
                bulkResponse.appendSuccessResponse(workflowId);
            } catch (Exception e) {
                bulkResponse.appendFailedResponse(workflowId, e.getMessage());
            }
        }
        return bulkResponse;
    }

    /**
     * Restart the list of workflows.
     * 
     * @param workflowIds
     * @return bulk response object containing a list of succeeded workflows and a
     *         list of failed ones with errors
     * @throws Exception
     */
    @POST
    @Path("/restart")
    @ApiOperation("Restart the list of completed workflow")
    public BulkResponse restart(List<String> workflowIds) throws Exception {
        Preconditions.checkNotNull(workflowIds, "workflowIds list cannot be null.");
        Preconditions.checkArgument(workflowIds.size() < MAX_REQUEST_ITEMS,
                "Cannot process more than  %s  workflows.  Please use multiple requests", MAX_REQUEST_ITEMS);

        BulkResponse bulkResponse = new BulkResponse();
        for (String workflowId : workflowIds) {
            try {
                executor.rewind(workflowId);
                bulkResponse.appendSuccessResponse(workflowId);
            } catch (Exception e) {
                bulkResponse.appendFailedResponse(workflowId, e.getMessage());
            }
        }
        return bulkResponse;
    }

    /**
     * Retry the last failed task for each workflow from the list.
     * 
     * @param workflowIds
     * @return bulk response object containing a list of succeeded workflows and a
     *         list of failed ones with errors
     * @throws Exception
     */
    @POST
    @Path("/retry")
    @ApiOperation("Retry the last failed task for each workflow from the list")
    public BulkResponse retry(List<String> workflowIds) throws Exception {
        Preconditions.checkNotNull(workflowIds, "workflowIds list cannot be null.");
        Preconditions.checkArgument(workflowIds.size() < MAX_REQUEST_ITEMS,
                "Cannot process more than  %s  workflows.  Please use multiple requests", MAX_REQUEST_ITEMS);

        BulkResponse bulkResponse = new BulkResponse();
        for (String workflowId : workflowIds) {
            try {
                executor.retry(workflowId);
                bulkResponse.appendSuccessResponse(workflowId);
            } catch (Exception e) {
                bulkResponse.appendFailedResponse(workflowId, e.getMessage());
            }
        }
        return bulkResponse;
    }

    /**
     * Terminate workflows execution.
     * 
     * @param workflowIds
     * @return bulk response object containing a list of succeeded workflows and a
     *         list of failed ones with errors
     * @throws Exception
     */
    @DELETE
    @Path("/")
    @ApiOperation("Terminate workflows execution")
    public BulkResponse terminate(List<String> workflowIds, @QueryParam("reason") String reason) throws Exception {
        Preconditions.checkNotNull(workflowIds, "workflowIds list cannot be null.");
        Preconditions.checkArgument(workflowIds.size() < MAX_REQUEST_ITEMS,
                "Cannot process more than  %s  workflows.  Please use multiple requests", MAX_REQUEST_ITEMS);

        BulkResponse bulkResponse = new BulkResponse();
        for (String workflowId : workflowIds) {
            try {
                executor.terminateWorkflow(workflowId, reason);
                bulkResponse.appendSuccessResponse(workflowId);
            } catch (Exception e) {
                bulkResponse.appendFailedResponse(workflowId, e.getMessage());
            }
        }
        return bulkResponse;
    }
}
