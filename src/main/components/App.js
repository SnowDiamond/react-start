import React from 'react';
import { connect } from 'react-redux';
import DevTools from 'modules/widgets/devTools';
import header from 'modules/widgets/header';
import footer from 'modules/widgets/footer';

import '../styles/global.scss';
import '../styles/bootstrap.scss';
import '../styles/font-awesome.scss';

const propTypes = {
  children: React.PropTypes.node
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render() {
    return (
      <div>
        <header.components.Header />
        <h1>Welcome to react application</h1>
        {this.props.children}
        <footer.components.Footer />
        {this.state.isMounted && <DevTools />}
      </div>
    );
  }
}

App.propTypes = propTypes;

export default connect()(App);
