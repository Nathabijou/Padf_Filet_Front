import React from 'react';
import { Card, Col } from 'antd';
import { Doughnut, Pie } from 'react-chartjs-2';

function DiagramAnneau({ beneficiaires, peyroll }) {
  if (!beneficiaires || !peyroll) {
    return <div>Loading...</div>;
  }

  const calculateFilles = beneficiaires.filter(b => b.sexe === 'F').length;
  const calculateGarcons = beneficiaires.filter(b => b.sexe === 'M').length;
  const totalSexe = calculateFilles + calculateGarcons;

  const qualifie = beneficiaires.filter(b => b.qualification === 'Q').length;
  const nonQualifie = beneficiaires.filter(b => b.qualification === 'NQ').length;
  const totalQualification = qualifie + nonQualifie;

  const monCashPayments = peyroll.filter(p => p.methode_paiement === 'monCash');
  const lajanCashPayments = peyroll.filter(p => p.methode_paiement === 'lajanCash');

  const monCashTotal = monCashPayments.reduce((acc, curr) => acc + curr.montant_paye, 0);
  const lajanCashTotal = lajanCashPayments.reduce((acc, curr) => acc + curr.montant_paye, 0);
  const totalPayroll = monCashTotal + lajanCashTotal;

  const percentageFilles = ((calculateFilles / totalSexe) * 100).toFixed(2);
  const percentageGarcons = ((calculateGarcons / totalSexe) * 100).toFixed(2);
  const percentageQualifie = ((qualifie / totalQualification) * 100).toFixed(2);
  const percentageNonQualifie = ((nonQualifie / totalQualification) * 100).toFixed(2);
  const percentageMonCash = ((monCashTotal / totalPayroll) * 100).toFixed(2);
  const percentageLajanCash = ((lajanCashTotal / totalPayroll) * 100).toFixed(2);

  const filleQualifierTotal = beneficiaires.filter(b => b.sexe === 'F' && b.qualification === 'Q').length;
  const garconsQualifierTotal = beneficiaires.filter(b => b.sexe === 'M' && b.qualification === 'Q').length;
  const filleNonQualifierTotal = beneficiaires.filter(b => b.sexe === 'F' && b.qualification === 'NQ').length;
  const garconsNonQualifierTotal = beneficiaires.filter(b => b.sexe === 'M' && b.qualification === 'NQ').length;

  const percentageFilleQualifier = ((filleQualifierTotal / totalSexe) * 100).toFixed(2);
  const percentageGarconsQualifier = ((garconsQualifierTotal / totalSexe) * 100).toFixed(2);
  const percentageFilleNonQualifier = ((filleNonQualifierTotal / totalSexe) * 100).toFixed(2);
  const percentageGarconsNonQualifier = ((garconsNonQualifierTotal / totalSexe) * 100).toFixed(2);

  const data = {
    labels: [
      `${percentageFilles}% Filles`,
      `${percentageGarcons}% Garçons`,
      `${percentageQualifie}% Qualifiés`,
      `${percentageNonQualifie}% Non Qualifiés`,
      `${percentageFilleQualifier}% Filles Qualifiées`,
      `${percentageGarconsQualifier}% Garçons Qualifiés`,
      `${percentageFilleNonQualifier}% Filles Non Qualifiées`,
      `${percentageGarconsNonQualifier}% Garçons Non Qualifiés`,
    ],
    datasets: [
      {
        data: [
          calculateFilles,
          calculateGarcons,
          qualifie,
          nonQualifie,
          filleQualifierTotal,
          garconsQualifierTotal,
          filleNonQualifierTotal,
          garconsNonQualifierTotal,
        ],
        backgroundColor: ['#29C3FC', '#7F3A7F', '#FD0D0D', '#1A1E93', '#1223F7', '#3DB84E', '#337357', '#FFC300'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'left',
        labels: {
          fontSize: 16, // Ajustez ici la taille de la police des légendes
          fontFamily: 'Verdana, sans-serif', // Ajoutez ici la famille de polices pour les légendes
        }
      },
      tooltip: {
        bodyFontFamily: 'Verdana, sans-serif', // Ajoutez ici la famille de polices pour les tooltips
      }  
    },
  };

  return (
    
    <Card className='card-graph' style={{ width: '100%', maxWidth: '100%', borderRadius: '12px', padding:'50px',top: '23px', height: '67.5%' }}> 
      <Pie 
        data={data} 
        options={options} 
        style={{ 
          fontFamily: 'Verdana, sans-serif ',
          marginTop: '-28%', 
          marginLeft: '-10px', 
          width: '100%', 
          maxWidth:'100%',
          padding:'90px',
          height: '50%',
          fontSize: 16 // Ajustez ici la taille de la police
        }} 
      />
    </Card>

       

  
  );
}

export default DiagramAnneau;
