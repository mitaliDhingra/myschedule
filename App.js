import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import Request from 'react-http-request';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';
import './App.scss';
//import Dialog from "react-native-dialog";
//var sforce=require('node-salesforce');
//var mypassword="Sherlock@2019";
//var mysecuritytoken="aj9XtB7R3pCeVBPHiJLwh2Vf";
//var sessionId = '';
//var result = sforce.connection.login("mitali.dhingra@accoliteindia.com", mypassword+mysecuritytoken);
//sforce.connection.init( 'https://webapitest-developer-edition.na174.force.com/services/apexrest/getAccounts/');

// here pass current session id of the org from which you are making request.

 

/*sforce.connection.remoteFunction({
          url : 'https://webapitest-developer-edition.na174.force.com/services/apexrest/getAccounts/',
          requestHeaders: {"Authorization":"Bearer ", "Content-Type":"application/json"},

          // here pass the session id of the org in which you have your REST service
          //requestData&colon; data to post in JSON format,
          method: "GET",
          onSuccess : function(response) {
                    console.log(response);
          },
          onFailure : function(response) {
                    alert("Failed" + response)
          }
});*/

  //var AccountResult;
  export default class App extends Component {
    calendarComponentRef = React.createRef()
  state = {
    calendarWeekends: true,
    calendarEvents: [ // initial event data
      { title: 'Event Now', start: new Date() }
    ]
  }
    render() {
      
      return (
        
        <Request
          url='https://webapitest-developer-edition.na174.force.com/services/apexrest/getAccounts/'
          method='get'
          accept='application/json'
          verbose={true}
        >
          {
            ({error, result, loading}) => {
              if (loading) {
                return <div>loading...</div>;
              } else {
                //AccountResult = result;
                return <div className='demo-app'>
                <div className='demo-app-top'>
                  <button onClick={ this.toggleWeekends }>toggle weekends</button>&nbsp;
                  <button onClick={ this.gotoPast }>go to a date in the past</button>&nbsp;
                  (also, click a date/time to add an event)
                </div>
                <div className='demo-app-calendar'>
                  <FullCalendar
                    defaultView="dayGridMonth"
                    header={{
                      left: 'prev,next today',
                      center: 'title',
                      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }}
                    plugins={[ dayGridPlugin,timeGridPlugin,  interactionPlugin ]}
                    ref={ this.calendarComponentRef }
                    weekends={ this.state.calendarWeekends }
                    events={ this.state.calendarEvents }
                    dateClick={ this.handleDateClick }
                    />
                </div>
              </div>;
              }
            }
          }
        </Request>
      );
          

    }
    handleDateClick = (arg) => {
      //this.setState({ dialogVisible: true });
     // if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
        this.setState({  // add new event data
          calendarEvents: this.state.calendarEvents.concat({ // creates a new array
            title: 'New Event',
            start: arg.date,
            allDay: arg.allDay
          })
        })
     //}
    }
  }


  /*return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/


//export default App;
