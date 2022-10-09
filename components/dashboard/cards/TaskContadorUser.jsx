import React, {useState, useEffect} from 'react';
import {Card} from '../style';
import {Text, H5, H2} from "@admin-bro/design-system";
import axios from "axios";


export let data = 0;

const TaskContadorUser = () => {


    axios.get('http://localhost:30001/api/v1/user/find').then(function (response) {
        data= response.data;
    
    }).catch(function (error) {
        console.log('Error: ', error);
    });
     return<Card as="a" href="#">
        <Text textAlign="center">
            <H5>Users</H5>
            <H2>{data}</H2>
        </Text>
    </Card>
};


export default TaskContadorUser;