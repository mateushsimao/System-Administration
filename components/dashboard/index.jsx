import React, { useEffect, useState }from 'react';

import { ApiClient } from 'admin-bro';

import { Box, H2, Text } from '@admin-bro/design-system';

import TaskType from './cards/TaskType';

import TaskContadorUser from './cards/TaskContadorUser';

import TaskContadorChannel from './cards/TaskContadorChannel';


const api = new ApiClient();

const Dashboard = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        api.getDashboard().then((response) => {
            setData(response.data);
        });
    }, [])

    
    return(
    <Box>
        <Box position="relative" overflow="hidden">
            <Box bg="grey20" height={284} py={74} px={['default', 'lg', 250]}>
                <Text textAlign="center" colors="primary100">
                    <H2>Bem-vindo(a) ao Gerenciamento da plataforma de IPTV</H2>
                    <Text opacity="0.8">Controle tudo de uma forma simples e rápida</Text>
                </Text>
            </Box>
        </Box>

        <Box mt={["x1", "x1", "-80px"]}
            mb="x1"
            mx={[0, 0, 0, 'auto']}
            px={["default", "lg", "xx1", "0"]}
            position="relative"
            flex
            flexDirection="row"
            flexWrap="wrap"
            width={[1,1,1,1024]}
        >
            <Box width={[1, 1, 1]} p="lg">
                <TaskType />
            </Box>
            <Box width={[1, 1, 1]} p="lg">
                <TaskContadorUser />
            </Box>
            <Box width={[1, 1, 1]} p="lg">
                <TaskContadorChannel />
            </Box>
        </Box>
    </Box>
    );
};

export default Dashboard;