const {AppBar, Paper,
       FlatButton,
       TextField,
       List, ListItem, ListDivider
  } = mui
const ThemeManager = new mui.Styles.ThemeManager();


Medications = new Mongo.Collection("medications")


if (Meteor.isClient) {
  // This code is executed on the client only
 
  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    React.render(<App />, document.getElementById("render-target"));
  });
}

// App component - represents the whole app
App = React.createClass({
  mixins: [ReactMeteorData],
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getMeteorData() {
    return {
      meds: Medications.find({}).fetch()
    }
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getInitialState() {
    return {
      inputs: []
    }
  },
  renderList() {
    return this.state.inputs.map((item) => {
      return <Item item={item}/>;
    });
  },
  _updateMeds() {
    inputs = Meteor.call("submitMeds", 
                         this.refs.input.getValue(),
                         (err, data)=>{this.setState({inputs: data})}.bind(this)
                         )
  },
  render() {
    return (
      <section className="container">
      <div className="row">
        <AppBar
          className="appbar"
          title="MedSearch"
          iconElementRight={<FlatButton label="About" />} />
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="item">
            <Paper className="paper" zDepth={2}>
              <TextField ref="input"
              hintText="Paste your medications in here!"
              onChange={this._updateMeds}
              multiLine={true}
              fullWidth={true}/>
          </Paper>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="item">
            <Paper  className="paper" zDepth={2}>
            <List>
              {this.renderList()}
            </List>
          </Paper>
          </div>
        </div>
      </div>
      </section>
    );
  }
});



// Item component
Item = React.createClass({
  render() {
    return (
      <div>
        <ListItem primaryText={this.props.item.name} secondaryText={this.props.item.medclass}/>
      </div>
    );
  }
});