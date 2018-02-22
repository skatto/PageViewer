import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/page_viewer.css';

const BallBar = (props) => {
  let balls = [];
  for (let i = 0; i < props.len; i++) {
    let opa = 0.5;
    if (i === props.n) {
      opa = 1.0;
    }
    balls.push(<div style={{borderRadius: '50%', width: '10px', height: '10px',
                            backgroundColor: props.color, opacity: opa}} key = {i}/>);
  }

  return (
    <div style={{position: 'absolute', top: 0,
                 right: 0, bottom: 0, width: '20px',
                 height: props.height +'px',
                 backgroundColor: props.background,
                 justifyContent: 'space-evenly', display: 'flex',
                 alignItems: 'center'}}>
      <div style={{width: '20px', height: (30 * props.len) + 'px',
                   flexFlow: 'column nowrap', alignItems: 'center',
                   justifyContent: 'space-evenly', display: 'flex'}}>
        {balls}
      </div>
    </div>
  );
};

class PageViewer extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.element = null;

    this.interval = 100;
    this.max_margin = 50;

    this.state = {
      page: 0,
      pos: 0,
      opacity: 1.0,
      height: (props.height + 2)+'px',
      marginTop: '0px'
    };

    this.onScroll = this.onScroll.bind(this);
  }

  onScroll() {
    let element = ReactDOM.findDOMNode(this.refs.outer);

    if (element.scrollTop !== 1) {
      if (this.state.opacity === 1.0) {
        setTimeout(this.update, 0, this, element.scrollTop > 1);
      }
      element.scrollTop = 1;
    }
  }

  update(that, plus) {
    let newstate = that.state;
    if (plus) {
      newstate.pos += 1;
    }
    else {
      newstate.pos -= 1;
    }
    newstate.pos = Math.min(Math.max(newstate.pos, 0), (that.props.pageN - 1) * that.interval * 2);
    const pos = newstate.pos;

    newstate.page = Math.floor((pos + that.interval) / (that.interval * 2));
    let transition_degrees = Math.abs(Math.max((pos % (that.interval * 2)), 0) - that.interval) / that.interval;

    newstate.opacity = transition_degrees;
    newstate.marginTop = Math.floor(that.max_margin * Math.pow(1 - transition_degrees, 1)) + 'px';

    if (transition_degrees < 1) {
      setTimeout(that.update, 0.033, that, plus);
    }
    that.setState(newstate);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.outer).scrollTop = 1;
  }

  componentWillUpdate() {
    this.element = ReactDOM.findDOMNode(this.refs.outer);
  }

  render() {
    let child = this.props.children;
    if (React.Children.count(child) === 1) {
      if (typeof child !== 'string') {
        child = React.cloneElement(child, {page: this.state.page});
      }
    }
    else {
      child = child[this.state.page];
    }

    return (
      <div style={{position: 'relative', 
                   backgroundColor: this.props.background}}>
        <div className={styles.scrollable}
         style={{height: this.props.height +'px'}}
         onScroll={this.onScroll} ref="outer">
          <div style={{
           width: 'calc(100% - 20px)',
           opacity: this.state.opacity,
           height: this.state.height,
           overflowY: 'visible',
           marginTop: this.state.marginTop
          }}>
            <div style={{
             position: 'relative',
             overflowY: 'visible',
             height: this.props.height + 'px'
            }}>
              {child}
            </div>
          </div>
        </div>
        <BallBar
         height={this.props.height}
         background={this.props.background}
         len={this.props.pageN}
         n={this.state.page}
         color={this.props.dotcolor} />
      </div>
    );
  }
}

PageViewer.defaultProps = {
  height: 500,
  pageN: 3,
  background: 'white',
  dotcolor: 'gray'
};

export default PageViewer;
