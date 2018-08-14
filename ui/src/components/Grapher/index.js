/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import dagreD3 from 'dagre-d3';
import d3 from 'd3';
import PopOver from './PopOver';

class Grapher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTask: {},
      logs: {}
    };

    this.grapher = new dagreD3.render();

    this.setSvgRef = elem => (this.svgElem = elem);
    this.setDivRef = elem => (this.divElem = elem);
    this.setPropsDivRef = elem => (this.propsDivElem = elem);

    const starPoints = (outerRadius, innerRadius) => {
      let results = '';
      const angle = Math.PI / 8;
      for (let i = 0; i < 2 * 8; i++) {
        // Use outer or inner radius depending on what iteration we are in.
        const r = (i & 1) == 0 ? outerRadius : innerRadius;
        const currX = 0 + Math.cos(i * angle) * r;
        const currY = 0 + Math.sin(i * angle) * r;
        if (i == 0) {
          results = `${currX},${currY}`;
        } else {
          results += `, ${currX},${currY}`;
        }
      }
      return results;
    };

    this.grapher.shapes().house = (parent, bbox, node) => {
      let w = bbox.width,
        h = bbox.height,
        points = [{ x: 0, y: 0 }, { x: w, y: 0 }, { x: w, y: -h }, { x: w / 2, y: (-h * 3) / 2 }, { x: 0, y: -h }];
      const shapeSvg = parent
        .insert('polygon', ':first-child')
        .attr('points', points.map(d => d.x + ',' + d.y).join(' '))
        .attr('transform', `translate(${-w / 2},${(h * 3) / 4})`);

      node.intersect = point => dagreD3.intersect.polygon(node, points, point);

      return shapeSvg;
    };

    this.grapher.shapes().star = (parent, bbox, node) => {
      let w = bbox.width,
        h = bbox.height,
        points = [{ x: 0, y: 0 }, { x: w, y: 0 }, { x: w, y: -h }, { x: w / 2, y: (-h * 3) / 2 }, { x: 0, y: -h }];
      const shapeSvg = parent.insert('polygon', ':first-child').attr('points', starPoints(w, h));
      node.intersect = point => {
        return dagreD3.intersect.polygon(node, points, point);
      };

      return shapeSvg;
    };
  }

  componentDidMount() {
    this.forceUpdate();
  }

  componentWillReceiveProps({ innerGraph }) {
    this.setState({ innerGraph });
  }

  getSubGraph() {
    const { subGraph: subg } = this.state;
    if (subg == null) {
      return '';
    }
    return <Grapher edges={subg.n} vertices={subg.vx} layout={subg.layout} />;
  }

  togleSidePopover = () => {
    this.setState({ showSideBar: !this.state.showSideBar });
  };

  render() {
    const { layout, edges, vertices } = this.props;
    const { selectedTask, showSideBar } = this.state;
    const g = new dagreD3.graphlib.Graph().setGraph({ rankdir: layout });

    for (const vk in vertices) {
      const v = vertices[vk];
      let l = v.name;
      if (!v.system) {
        l = `${v.name}\n \n(${v.ref})`;
      } else {
        l = v.ref;
      }
      g.setNode(v.ref, {
        label: l,
        shape: v.shape,
        style: v.style,
        labelStyle: `${v.labelStyle}; font-weight:normal; font-size: 11px`
      });
    }

    edges.forEach(e => {
      g.setEdge(e.from, e.to, { label: e.label, lineInterpolate: 'basis', style: e.style });
    });

    g.nodes().forEach(v => {
      let node = g.node(v);
      if (node == null) {
        console.log(`NO node found ${v}`);
      }
      node.rx = node.ry = 5;
    });

    const svg = d3.select(this.svgElem);
    const inner = svg.select('g');
    inner.attr('transform', 'translate(20,20)');
    this.grapher(inner, g);
    const w = g.graph().width + 50;
    const h = g.graph().height + 50;
    svg.attr('width', `${w}px`).attr('height', `${h}px`);

    const innerGraph = this.state.innerGraph || [];

    const showSubGraphDetails = () => {
      const id = this.state.subGraphId;
      window.open(`#/workflow/id/${id}`, '_new');
    };

    const hidesub = () => {
      this.setState({ showSubGraph: false });
    };

    inner.selectAll('g.node').on('click', v => {
      if (innerGraph[v] != null) {
        const { data } = vertices[v];

        const n = innerGraph[v].edges;
        const vx = innerGraph[v].vertices;
        const subg = { n, vx, layout };

        console.log('data A =>', data);
        this.setState({
          selectedTask: data.task,
          showSubGraph: true,
          showSideBar: true,
          subGraph: subg,
          subGraphId: innerGraph[v].id
        });
      } else if (vertices[v].tooltip != null) {
        const { data } = vertices[v];
        console.log('data B =>', data);
        this.setState({ selectedTask: data.task, showSideBar: true, subGraph: null, showSubGraph: false });
      }
    });

    return (
      <div className="graph-ui-content" id="graph-ui-content">
        <PopOver selectedTask={selectedTask} showSideBar={showSideBar} hideProps={this.togleSidePopover} />
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <svg ref={this.setSvgRef}>
            <g transform="translate(20,20)" />
          </svg>
        </div>
        <div
          className="right-prop-overlay"
          ref={this.setDivRef}
          style={{
            overflowX: 'scroll',
            display: this.state.showSubGraph ? '' : 'none',
            padding: '5px 5px 10px 10px',
            zIndex: this.state.showSubGraph ? '' : '-100'
          }}
        >
          <h4 className="props-header">
            <i className="fa fa-close fa-1x close-btn" onClick={hidesub} />
            <a onClick={showSubGraphDetails}>Sub Workflow Details</a>
          </h4>
          {this.getSubGraph()}
        </div>
      </div>
    );
  }
}
export default Grapher;
