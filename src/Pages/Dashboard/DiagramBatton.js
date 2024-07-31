import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Bar, Doughnut } from 'react-chartjs-2';

function DiagramBatton() {
  const [paymentData, setPaymentData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Appel à l'API pour récupérer les payrolls
        const response = await fetch('http://localhost:8080/payrolls');
        const payrolls = await response.json();

        // Calcul des pourcentages pour chaque catégorie
        const percentages = calculatePercentages(payrolls);

        // Création des données pour le graphique
        const data = {
          labels: Object.keys(percentages),
          datasets: [
            {
              label: 'Pourcentages',
              data: Object.values(percentages),
              backgroundColor: ['#B96182', '#05DBF8', '#FFC0CB', '#87CEEB', '#90EE90', '#FFD700'], // Couleurs pour chaque catégorie
            },
          ],
        };

        setPaymentData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de paiement', error);
      }
    };

    fetchData();
  }, []);

  const calculatePercentages = (payrolls) => {
    const counts = {
      MonCash: 0,
      LajanCash: 0,
      Female: 0,
      Male: 0,
      Qualified: 0,
      Unqualified: 0,
      FemaleMonCash: 0,
      FemaleLajanCash: 0,
      MaleMonCash: 0,
      MaleLajanCash: 0,    
      MaleUnqualifiedMonCash: 0,
      MaleUnqualifiedLajanCash: 0,      
      UnqualifiedMonCash: 0,
      UnqualifiedLajanCash: 0,
    };
  
    payrolls.forEach(payroll => {
      // Calcul des pourcentages pour la méthode de paiement
      if (payroll.methode_paiement === 'LajanCash') {
        counts.LajanCash++;
      } else if (payroll.methode_paiement === 'MonCash') {
        counts.MonCash++;
      }
  
      // Calcul des pourcentages pour le sexe
      if (payroll.beneficiaire_sexe === 'Fille') {
        counts.Female++;
        if (payroll.methode_paiement === 'LajanCash') {
          counts.FemaleLajanCash++;
        } else if (payroll.methode_paiement === 'MonCash') {
          counts.FemaleMonCash++;
        }
      } else {
        counts.Male++;
        if (payroll.methode_paiement === 'LajanCash') {
          counts.MaleLajanCash++;
        } else if (payroll.methode_paiement === 'MonCash') {
          counts.MaleMonCash++;
        }
      }
  
      // Calcul des pourcentages pour la qualification
      if (payroll.beneficiaire_qualification === 'Qualified') {
        counts.Qualified++;
        if (payroll.methode_paiement === 'LajanCash') {
          counts.QualifiedLajanCash++;
        } else if (payroll.methode_paiement === 'MonCash') {
          counts.QualifiedMonCash++;
        }
        if (payroll.beneficiaire_sexe === 'Fille') {
          if (payroll.methode_paiement === 'LajanCash') {
            counts.FemaleQualifiedLajanCash++;
          } else if (payroll.methode_paiement === 'MonCash') {
            counts.FemaleQualifiedMonCash++;
          }
        } else {
          if (payroll.methode_paiement === 'LajanCash') {
            counts.MaleQualifiedLajanCash++;
          } else if (payroll.methode_paiement === 'MonCash') {
            counts.MaleQualifiedMonCash++;
          }
        }
      } else {
        counts.Unqualified++;
        if (payroll.methode_paiement === 'LajanCash') {
          counts.UnqualifiedLajanCash++;
        } else if (payroll.methode_paiement === 'MonCash') {
          counts.UnqualifiedMonCash++;
        }
        if (payroll.beneficiaire_sexe === 'Fille') {
          if (payroll.methode_paiement === 'LajanCash') {
            counts.FemaleUnqualifiedLajanCash++;
          } else if (payroll.methode_paiement === 'MonCash') {
            counts.FemaleUnqualifiedMonCash++;
          }
        } else {
          if (payroll.methode_paiement === 'LajanCash') {
            counts.MaleUnqualifiedLajanCash++;
          } else if (payroll.methode_paiement === 'MonCash') {
            counts.MaleUnqualifiedMonCash++;
          }
        }
      }
  
      // Calcul des pourcentages pour la combinaison de sexe et de qualification
      if (payroll.beneficiaire_sexe === 'Fille' && payroll.beneficiaire_qualification === 'Qualified') {
        if (payroll.methode_paiement === 'LajanCash') {
          counts.FQMonCash++;
        } else if (payroll.methode_paiement === 'MonCash') {
          counts.FQLajanCash++;
        }
      } else if (payroll.beneficiaire_sexe === 'Garçon' && payroll.beneficiaire_qualification === 'Qualified') {
        if (payroll.methode_paiement === 'LajanCash') {
          counts.MQMonCash++;
        } else if (payroll.methode_paiement === 'MonCash') {
          counts.MQLajanCash++;
        }
      } else if (payroll.beneficiaire_sexe === 'Fille' && payroll.beneficiaire_qualification === 'Unqualified') {
        if (payroll.methode_paiement === 'LajanCash') {
          counts.FNQMonCash++;
        } else if (payroll.methode_paiement === 'MonCash') {
          counts.FNQLajanCash++;
        }
      } else if (payroll.beneficiaire_sexe === 'Garçon' && payroll.beneficiaire_qualification === 'Unqualified') {
        if (payroll.methode_paiement === 'LajanCash') {
          counts.MQMonCash++;
        } else if (payroll.methode_paiement === 'MonCash') {
          counts.MQLajanCash++;
        }
      }
    });
  
    // Conversion des totaux en pourcentages
    const totalPayrolls = payrolls.length;
    for (const key in counts) {
      counts[key] = ((counts[key] / totalPayrolls) * 100).toFixed(2);
    }
  
    return counts;
  };
  
  

  return (
    <Card style={{ width: 'auto', maxWidth: '100%', borderRadius: '12px', top: '23px', height: 'auto', marginLeft: '-2px' }}> 
      <Bar options={paymentData} data={paymentData} />
    </Card>
  );
}

export default DiagramBatton;
