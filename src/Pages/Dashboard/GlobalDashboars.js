import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Card } from 'antd';
import BeneficiaireChart from './BeneficiairesChart';
import DiagramBatton from './DiagramBatton';
import DiagramAnneau from './DiagramAnneau';
import { getBeneficiaire, getRecentProject } from '../../Layout/API';
import Recentbeneficiaire from './Recentbeneficiaire';
import RecentProject from './RecentProject';
import DiagramJauge from './DiagramGauge';
import DiagramGauge from './DiagramGauge';
import { Map } from '@mui/icons-material';
import Mapinf from './MapInf';

const { Title } = Typography;

function GlobalDashboard() {
  const [beneficiaires, setBeneficiaires] = useState(null);
  const [peyroll, setPeyroll] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const beneficiairesData = await getBeneficiaire();
        const peyrollData = await getRecentProject();
        setBeneficiaires(beneficiairesData);
        setPeyroll(peyrollData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className='interface'>
      <Title level={5}>
        <strong style={{ color: '#885266', fontSize: 'auto', textDecoration: 'underline' }}>Global Dashboard</strong>
        
      </Title>
      <div className='scrollable-content'>
        
        <Row gutter={[16, 16]} justify="center" wrap={true}>
          <Col className='slds-card-graph' span={24}>
            <BeneficiaireChart />
          </Col>
        </Row>

        <Row gutter={[16, 16]} justify="center" wrap={true}>
          <Col className='slds-card-graph' xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <DiagramBatton beneficiaires={beneficiaires} />
          </Col>

          <Col className='slds-card-graph' xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <DiagramAnneau beneficiaires={beneficiaires} peyroll={peyroll} />
          </Col>   
        
    
          <Row gutter={[16, 16]} justify="center" wrap={true}>
          
            <RecentProject />
          
        </Row>
        
            <Row gutter={[16, 16]} justify="center" wrap={true}>
                    <Mapinf /> {/* Ajoutez la composante Mapinf ici */}
          </Row>
         </Row>
       
        {/** 
         <Row gutter={[16, 16]} justify="center" wrap={true}>
          
            <DiagramGauge />
          
        </Row>
          */}
      </div>
    </div>
  );
}

export default GlobalDashboard;
