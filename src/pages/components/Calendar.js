import React from "react";
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    MonthView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
  } from '@devexpress/dx-react-scheduler-material-ui';


  export default function Caledario({ data }) {
    console.log(data)
    return (
        
        <Paper>
        <Scheduler
                data= {data}
        >
        <ViewState
            defaultCurrentDate= {new Date()}
        />
        <MonthView />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <Appointments />
        </Scheduler>
    </Paper>
    );

}