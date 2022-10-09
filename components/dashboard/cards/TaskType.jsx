import React, {useState, useEffect} from 'react';
import {Card} from '../style';
import {Text, H5, H2} from "@admin-bro/design-system";
import { Chart } from "react-google-charts";
import axios from "axios";




export let data = [
    ["Task", "Contacts"],
    ["Not answered", 0],
    ["Answered", 0],
  ];
export let status = false;

const TaskType = () => {

    axios.get('http://localhost:30001/api/v1/contacts/find').then(function (response) {
        data= response.data;
        status = true;
    
    }).catch(function (error) {
        console.log('Error: ', error);
    });
    if(status){
     return<Card as="a" href="#">
            <Text textAlign="center">
                <H5>Contacs</H5>
                    <Chart
                        chartType="PieChart"
                        data={data}
                        width={"100%"}
                        height={"100%"}
                    />
            </Text>
        </Card>
    }else{
        return <Card as="a" href="#">
                    <Text textAlign="center">
                        <H5>Contacs</H5>
                        <H2>Not Have Contacts in Moment</H2>
                    </Text>
            </Card>

    };
};


export default TaskType;