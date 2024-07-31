import React, { useEffect, useState, useRef } from 'react';
import { App, Button, Card, Space, Statistic, Table, Typography } from 'antd';
import { UserOutlined, ProjectOutlined } from '@ant-design/icons';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, DoughnutController, ArcElement } from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { getBeneficiaire, getBeneficiaireAge, getRecentReport } from '../../Layout/API';
import { Row, Col } from 'antd';
import { ResponsiveContainer } from 'recharts';
import { auto } from '@popperjs/core';
import { Link } from 'react-router-dom';
import { useBaseUrl } from '../../BaseUrl';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, DoughnutController, ArcElement);
ChartJS.register(DoughnutController, ArcElement);

function DashboardppItem({ title, value, icon }) {
  return (
    <Card>
      <Space direction='horizontal'>
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}



function ParentComponent() {
  const handleOnClickReport = (reportId) => {
    // Logique pour gérer le clic sur le rapport
    console.log(`Rapport cliqué avec l'ID : ${reportId}`);// Utilisez une bibliothèque de graphiques ou une logique personnalisée pour mettre à jour le graphe.
  };

  return (
    <RecentRepport onClickReport={handleOnClickReport} />
  );
}



// ... (votre importations existantes)

const RecentRepport = ({ onClickReport }) => {
  const baseUrl= useBaseUrl();
  const [dataSource, setDatasource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getBeneficiaire();
        console.log('Données du rapport récent :', res);
        setDatasource(res.slice());
      } catch (error) {
        console.error('Erreur lors de la récupération des données du serveur', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const handleRowClick = (record) => {
    onClickReport && onClickReport(record.id);
  };

  const columns = [
    {
      title: 'Nom du Rapport',
      dataIndex: 'reportName',
      key: 'reportName',
      ellipsis: true,
      width: '27%',
      render: (text, record) => (
        <div
          className="ellipsis-text"
          style={{ cursor: 'pointer', color: 'blue' }}
          onClick={() => handleRowClick(record)}
        >
          {text}
        </div>
      ),
    },
    {
      title: 'Date du Rapport',
      dataIndex: 'reportDate',
      key: 'reportDate',
      ellipsis: true,
      width: '10%',
      render: (text) => <div className="ellipsis-text">{text}</div>,
    },
  ];

  return (
    <>
      <Typography.Text>
        <div className='recent'>
          <strong>Recent Repport </strong>
        </div>
      </Typography.Text>
      <div style={{ maxHeight: '680px', overflowY: 'auto', overflowX: 'auto' }}>
        <Table
          columns={columns}
          loading={loading}
          dataSource={dataSource}
          pagination={false}
          size="small"
          bordered
          className="responsive-table"
        />
      </div>
    </>
  );
}



function calculateFilles(beneficiaires) {
  return beneficiaires.filter((b) => b.sexe === 'F').length;
}

function calculateGarcons(beneficiaires) {
  return beneficiaires.filter((b) => b.sexe === 'M').length;
}

function DashboardChart({ beneficiaires }) {
  const [ageData, setAgeData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBeneficiaireAge();
        const labels = res.carts.map((cart) => `User-${cart.userId}`);
        const data = res.carts.map((cart) => cart.discountedTotal);

        const dataSource = {
          labels,
          datasets: [
            {
              label: 'Beneficiaire Age',
              data,
              backgroundColor: ['#E87B1B', '#1B97E8'],
            },
          ],
        };

        setAgeData(dataSource);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du serveur', error);
      }
    };

    fetchData();
  }, []);


  function getCombinedData(beneficiaires) {
    const filles = calculateFilles(beneficiaires);
    const garcons = calculateGarcons(beneficiaires);
    const totalSexe = filles + garcons;

    const qualifie = beneficiaires.filter((b) => b.qualification === 'Q').length;
    const nonQualifie = beneficiaires.filter((b) => b.qualification === 'NQ').length;
    const totalQualification = qualifie + nonQualifie;

    const monCash = beneficiaires.filter((b) => b.payroll === 'MonCash').length;
    const lajanCash = beneficiaires.filter((b) => b.payroll === 'LajanCash').length;
    const totalPayroll = monCash + lajanCash;

    const percentageFilles = ((filles / totalSexe) * 100).toFixed(2);
    const percentageGarcons = ((garcons / totalSexe) * 100).toFixed(2);

    const percentageQualifie = ((qualifie / totalQualification) * 100).toFixed(2);
    const percentageNonQualifie = ((nonQualifie / totalQualification) * 100).toFixed(2);

    const percentageMonCash = ((monCash / totalPayroll) * 100).toFixed(2);
    const percentageLajanCash = ((lajanCash / totalPayroll) * 100).toFixed(2);

    return {
      labels: [
        `${percentageFilles}% Filles`,
        `${percentageGarcons}% Garçons`,
        `${percentageQualifie}% Qualifiés`,
        `${percentageNonQualifie}% Non Qualifiés`,
        `${percentageMonCash}% MonCash`,
        `${percentageLajanCash}% LajanCash`,
      ],
      datasets: [
        {
          data: [filles, garcons, qualifie, nonQualifie, monCash, lajanCash],
          backgroundColor: ['#4ACCF3', '#EA0DE0', '#F1C40F', '#A93226', '#3498DB', '#F7B111'],
        },
      ],
      percentageSalaires: {
        MonCash: percentageMonCash,
        LajanCash: percentageLajanCash,
      },
    };
  }

  const data = getCombinedData(beneficiaires);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Combinaison des données',
        height: 215,
      },
    },
  };

  return (
    <ResponsiveContainer width="700px" height={670}>    
       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      <Card className="slds-card" style={{ width: '800px', maxWidth: '100%', height: '340px',  bordered:'100px', top:'6px' }}>
        <Bar options={options} data={ageData} />
      </Card>

      
      <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
        <Card className="slds-card" style={{ width: '700px', top:'0px', maxWidth: 'auto', height: '340px',  marginLeft:'0px', position: 'relative' }}>
          <Doughnut  data={getCombinedData(beneficiaires)} style={{ width: 'auto', height: '80%', maxWidth: 'auto', maxHeight: '300px' }} />          
        </Card> 
      </Col>    
      </div>
    </ResponsiveContainer>
  );
  }

  
  function Dashboardpp() {
    const baseUrl= useBaseUrl();
    const [beneficiaires, setBeneficiaires] = useState([]);
    const [nombreDeFilles, setNombreDeFilles] = useState(0); // Ajoutez l'état pour le nombre de filles
    const [nombreDeGarcons, setNombreDeGarcons] = useState(0); // Ajoutez l'état pour le nombre de garçons
    const [nombreDeProjets, setNombreDePetitProjet] = useState(0); 
    const [nombreDeCentreFormation, setNombreDeCentreFormation] = useState(0);// Ajoutez l'état pour le nombre de projets
    const [nombreDeZones, setNombreDeZones] = useState(0); // Ajoutez l'état pour le nombre de zones
    const [selectedReportId, setSelectedReportId] = useState(null);
    
    const [zoneId, setZoneId] = useState(null);
    const [composanteId, setComposanteId] = useState(null);
    const [petitprojetId, setPetitprojetId] = useState(null);
  
    const handleReportClick = async (reportId, zoneId, composanteId, petitprojetId) => {
      setSelectedReportId(reportId);
      setZoneId(zoneId);
      setComposanteId(composanteId);
      setPetitprojetId(petitprojetId);
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (selectedReportId) {
            // Total des bénéficiaires
            const responseBeneficiaires = await fetch(`${baseUrl}/report/${selectedReportId}/beneficiaires`);
            const dataBeneficiaires = await responseBeneficiaires.json();
            setBeneficiaires(dataBeneficiaires);
    
            // Filles
            const responseFilles = await fetch(`${baseUrl}/report/${selectedReportId}/beneficiaires?sexe=F`);
            const dataFilles = await responseFilles.json();
            setNombreDeFilles(dataFilles);
    
            // Garçons
            const responseGarcons = await fetch(`${baseUrl}/report/${selectedReportId}/beneficiaires?sexe=M`);
            const dataGarcons = await responseGarcons.json();
            setNombreDeGarcons(dataGarcons);
    
            // Petit projet
            const responsePetitProjet = await fetch(`${baseUrl}/report/${selectedReportId}/petitprojet`);
            const dataPetitProjet = await responsePetitProjet.json();
            setNombreDePetitProjet(dataPetitProjet);
    
            // Centre de formation
            const responseCentreFormation = await fetch(`${baseUrl}/report/${selectedReportId}/centreformation`);
            const dataCentreFormation = await responseCentreFormation.json();
            setNombreDeCentreFormation(dataCentreFormation);
    
            // Zone
            const responseZones = await fetch(`${baseUrl}/report/${selectedReportId}/zones`);
            const dataZones = await responseZones.json();
            setNombreDeZones(dataZones);
    
            // Fetch other data based on selected report...
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données', error);
          // Gérer l'erreur ici
        }
      };
    
      fetchData();
    }, [selectedReportId]);
    
    
    

  function RecentBeneficiaire({ onClickReport }) {
    const [selectedReport, setSelectedReport] = useState(null);
    const [dataSource, setDatasource] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await getBeneficiaire();
          console.log('Données du rapport récent :', res);
          setDatasource(res.slice());
        } catch (error) {
          console.error('Erreur lors de la récupération des données du serveur', error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();
    }, []);
    
    const handleRowClick = (record) => {
      setSelectedReport(record);
      onClickReport && onClickReport(record);
    };
  
    const columns = [
      
      
      {
        title: 'Nom',
        dataIndex: 'nom',
        key: 'nom',
        ellipsis: true,
        width: '20%',
        render: (text) => <div className="ellipsis-texts">{text}</div>,
      },
      {
        title: 'Prenom',
        dataIndex: 'prenom',
        key: 'prenom',
        ellipsis: true,
        width: '20%',
        render: (text) => <div className="ellipsis-texts">{text}</div>,
      },
      {
        title: 'Sexe',
        dataIndex: 'sexe',
        key: 'sexe',
        ellipsis: true,
        width: '20%',
        render: (text) => <div className="ellipsis-texts">{text}</div>,
      },
      {
        title: 'Qualification',
        dataIndex: 'qualification',
        key: 'qualification',
        ellipsis: true,
        width: '20%',
        render: (text) => <div className="ellipsis-texts">{text}</div>,
      },
      {
        title: 'Identification',
        dataIndex: 'identification',
        key: 'identification',
        ellipsis: true,
        width: '20%',
        render: (text) => <div className="ellipsis-texts">{text}</div>,
      },
      {
        title: 'Telephone ',
        dataIndex: 'telephonecontact',
        key: 'telephonecontact',
        ellipsis: true,
        width: '27%',
        render: (text) => <div className="ellipsis-texts">{text}</div>,
      },
      
    ];
  
    return (
      <>
        <Typography.Text>
          <div className='recent'>
            <strong> </strong>
          </div>
        </Typography.Text>
        <div style={{ maxHeight: '680px', overflowY: 'auto', overflowX: 'auto' }}>
          <Table
            columns={columns}
            loading={loading}
            dataSource={dataSource}
            pagination={false}
            size="small"
            bordered
            className="responsive-table"
          />
        </div>
  
      </>
    );
  }
  

//Diagramme en Baton pour recuperer Beneficiaire par zone

return (
  <div className='inetrface'>    
    <Space size={5} direction='vertical'>
      <Typography.Title level={5}>
      <div>
      <strong style={{ color: '#885266', fontSize: 'auto' , textDecoration: 'underline' }}>Repport-Dashboard</strong>
      
   <div className='titrereports slideFromRight'> PADF....&lt;&lt; Filet de Sécurité Sociale Temporaire et Compétence pour les Jeunes &gt;&gt;</div> 
  
 </div>
 <Link to={`/App/report/createreport`}><button  type="button" className="createreport">New Report</button></Link>
      </Typography.Title>

      
      <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
            <Card className='slds-card'>
            <DashboardppItem
              icon={<UserOutlined className="slds-card" style={{ color: '#fff', backgroundColor: '#1362ac ', borderRadius: 20, boxShadow: '1px', fontSize: 25, padding: 10 }} />}
              title={<span className="bold-title">Total Beneficiaires</span>}
              value={beneficiaires.length}
              className="responsive-items"
            />
         </Card>
          </Col>

          <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <Card className='slds-card'>
              <DashboardppItem
                icon={<UserOutlined className="slds-card" style={{ color: '#151402', backgroundColor: '#E83F7F', borderRadius: 20, fontSize: 25, padding: 10 }} />}
                title={<span className="bold-title">Filles</span>}
                value={calculateFilles(beneficiaires)}
                className="responsive-items"
              />
           </Card>
          </Col>

          <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <Card className='slds-card'>
              <DashboardppItem
                icon={<UserOutlined className="slds-card" style={{ color: '#561176', backgroundColor: '#bbdb2a', borderRadius: 20, fontSize: 25, padding: 10 }} />}
                title={<span className="bold-title">Garcons</span>}
                value={calculateGarcons(beneficiaires)}
                className="responsive-items"
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
            <Card className='slds-card'>
              <DashboardppItem
                icon={<ProjectOutlined className="slds-card" style={{ color: '#151402', backgroundColor: '#ED840D', borderRadius: 20, fontSize: 25, padding: 10 }} />}
                title={<span className="bold-title">Petit-Projets</span>}
                //value={projectsCountByType['Infrastructure'] || 0} // Utilisez la clé correcte pour le type de projet
                className="responsive-items"
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
            <Card className='slds-card'>
              <DashboardppItem
                icon={<ProjectOutlined className="slds-card" style={{ color: '#151402', backgroundColor: '#0F9C7B', borderRadius: 20, fontSize: 25, padding: 10 }} />}
                title={<span className="bold-title">Centres-Formations</span>}
                //value={projectsCountByType['Formation Professionnelle'] || 0} // Utilisez la clé correcte pour le type de projet
                className="responsive-items"
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <Card className='slds-card'>
              <DashboardppItem
                icon={<ProjectOutlined className="slds-card" style={{ color: '#151402', backgroundColor: '#14F66A', borderRadius: 20, fontSize: 25, padding: 10, position: 'relative', flexDirection: 'column' }} />}
                title={<span className="bold-title">Zones d'interv</span>}
                //value={zone.length}
                className="responsive-items"
              />
            </Card>
          </Col>
        </Row>
     

      <Space style={{ width: 'auto', justifyContent: 'center' }}>
        <RecentRepport style={{ flex: '0 1 100%' }} />
        <DashboardChart beneficiaires={beneficiaires} />
      </Space>   
    </Space>

    <div className='dashboard-title'>
        <h1 className='dashboard-title-heading'>
          La liste des Bénéficiaires
        </h1>
       </div> 
        <p className='dashboard-subtitle titrereports slideFromRight'>
          PADF....&lt;&lt; Filet de Sécurité Sociale Temporaire et Compétence pour les Jeunes &gt;&gt;
        </p>
      


      <Space style={{ width: '100%', justifyContent: 'center' }}>
        <RecentBeneficiaire style={{ flex: '0 1 100%' }} />
       <selectedReport/>
      </Space>  
      
    
  </div>
);
}

export default Dashboardpp;


   

