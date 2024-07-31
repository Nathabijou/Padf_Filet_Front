// BeneficiairesChart.js
import React, { useState, useEffect } from 'react';
import { Card, Statistic, Typography, Row, Col, Progress } from 'antd';
import { UserOutlined ,ProjectOutlined} from '@ant-design/icons';
import { useBaseUrl } from '../../BaseUrl';

const { Title } = Typography;

function BeneficiairesChart() {
    const [beneficiaires, setBeneficiaires] = useState([]);
    const [progressValue, setProgressValue] = useState(0);
    const baseUrl = useBaseUrl(); 
    const [projectsCountByType, setProjectsCountByType] = useState({});
    const [zone, setZone] = useState([]); 
    const [totalQuantity, setTotalQuantity] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseBeneficiaires = await fetch(`${baseUrl}/beneficiaire`);
                const dataBeneficiaires = await responseBeneficiaires.json();
                setBeneficiaires(dataBeneficiaires);

                const responseProjectsCountByType = await fetch(`${baseUrl}/petitprojet/count-by-type`);
                const dataProjectsCountByType = await responseProjectsCountByType.json();
                setProjectsCountByType(dataProjectsCountByType);

                const responseZone = await fetch(`${baseUrl}/zone`);
                const dataZone = await responseZone.json();
                setZone(dataZone);

                setTotalQuantity(dataBeneficiaires.length + dataProjectsCountByType['Infrastructure'] + dataProjectsCountByType['Formation Professionnelle'] + dataZone.length);
            } catch (error) {
                console.error('Erreur lors de la récupération des données', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgressValue(prevValue => {
                const newValue = prevValue + 1;
                return newValue >= 100 ? 0 : newValue;
            });
        }, 50);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className='interfacess'>
            <Title level={5}>
                
            </Title>

            <Row gutter={[16, 16]} justify="center" wrap={true}>
                {renderCards()}
            </Row>
        </div>
    );

    function renderCards() {
        return (
            <>
                <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={4}>
                    <Card className='slds-card'>
                        <Statistic
                            title={<Title level={2} style={{ fontFamily: 'Verdana, sans-serif', fontSize: '14px' }}>Beneficiaires</Title>}
                            value={beneficiaires.length}
                            prefix={<UserOutlined style={{ background: '#0073e6', color: '#fff', padding: '5px', borderRadius: '50%' }} />}
                            valueStyle={{ fontSize: '15px' }}
                        />
                        <Progress percent={progressValue} />
                        <div style={{ height: '8px', background: 'linear-gradient(to right, #0073e6, #00c3ff)', borderRadius: '0 0 10px 10px' }}></div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={4}>
                    <Card className='slds-card'>
                        <Statistic
                           title={<Title level={2} style={{ fontFamily: 'Verdana, sans-serif', fontSize: '14px' }}>Filles</Title>}
                            value={calculateFilles(beneficiaires)}
                            prefix={<UserOutlined style={{ background: '#ff8000', color: '#fff', padding: '5px', borderRadius: '50%' }} />}
                            valueStyle={{ fontSize: '15px' }}
                        />
                        <Progress percent={progressValue} />
                        <div style={{ height: '8px', background: 'linear-gradient(to right, #ff8000, #ffb366)', borderRadius: '0 0 10px 10px' }}></div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={4}>
                    <Card className='slds-card'>
                        <Statistic
                        title={<Title level={2} style={{ fontFamily: 'Verdana, sans-serif', fontSize: '14px' }}>Garçons</Title>}                            
                            value={calculateGarcons(beneficiaires)}
                            prefix={<UserOutlined style={{ background: '#ff4d4d', color: '#fff', padding: '5px', borderRadius: '50%' }} />}
                            valueStyle={{ fontSize: '15px' }}
                        />
                        <Progress percent={progressValue} />
                        <div style={{ height: '8px', background: 'linear-gradient(to right, #ff4d4d, #ff8080)', borderRadius: '0 0 10px 10px' }}></div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={4}>
                    <Card className='slds-card'>
                        <Statistic
                        title={<Title level={2} style={{ fontFamily: 'Verdana, sans-serif', fontSize: '14px' }}>Petit-Projets</Title>}
                            value={projectsCountByType['Infrastructure'] || 0}
                            prefix={<ProjectOutlined style={{ background: '#00b300', color: '#fff', padding: '5px', borderRadius: '50%' }} />}
                            valueStyle={{ fontSize: '15px' }}
                        />
                        <Progress percent={progressValue} />
                        <div style={{ height: '8px', background: 'linear-gradient(to right, #00b300, #00e600)', borderRadius: '0 0 10px 10px' }}></div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={4}>
                    <Card className='slds-card'>
                        <Statistic
                         title={<Title level={2} style={{ fontFamily: 'Verdana, sans-serif ', fontSize: '14px' }}>Centres</Title>}                           
                            value={projectsCountByType['Formation Professionnelle'] || 0}
                            prefix={<ProjectOutlined style={{ background: '#9933ff', color: '#fff', padding: '5px', borderRadius: '50%' }} />}
                            valueStyle={{ fontSize: '15px' }}
                        />
                        <Progress percent={progressValue} />
                        <div style={{ height: '8px', background: 'linear-gradient(to right, #9933ff, #bf80ff)', borderRadius: '0 0 10px 10px' }}></div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={4}>
                    <Card className='slds-card'>
                        <Statistic
                        title={<Title level={2} style={{ fontFamily: 'Verdana, sans-serif', fontSize: '14px' }}>Zones d'int</Title>}
                            value={zone.length}
                            prefix={<ProjectOutlined style={{ background: '#ff0066', color: '#fff', padding: '5px', borderRadius: '50%' }} />}
                            valueStyle={{ fontSize: '15px' }}
                        />
                        <Progress percent={progressValue} />
                        <div style={{ height: '8px', background: 'linear-gradient(to right, #ff0066, #ff3399)', borderRadius: '0 0 10px 10px' }}></div>
                    </Card>
                </Col>
            </>
        );
    }

    function calculateFilles(beneficiaires) {
        return beneficiaires.filter((b) => b.sexe === 'F').length;
    }

    function calculateGarcons(beneficiaires) {
        return beneficiaires.filter((b) => b.sexe === 'M').length;
    }
}
export default BeneficiairesChart;
