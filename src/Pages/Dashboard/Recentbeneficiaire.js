import React, { useState, useEffect } from 'react';
import { Table, Typography } from 'antd';
import { getBeneficiaire } from '../../Layout/API';

function Recentbeneficiaire() {
  const [dataSource, setDatasource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getBeneficiaire();
        setDatasource(res.slice());
      } catch (error) {
        console.error('Erreur lors de la récupération des données du serveur', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
      ellipsis: true,
      width: '25%', // Utilisez des pourcentages pour la largeur
      render: (text) => <div className="ellipsis-text">{text}</div>,
    },
    {
      title: 'Prenom',
      dataIndex: 'prenom',
      key: 'prenom',
      ellipsis: true,
      width: '25%',
      render: (text) => <div className="ellipsis-text">{text}</div>,
    },
    {
      title: 'Sexe',
      dataIndex: 'sexe',
      key: 'sexe',
      ellipsis: true,
      width: '20%',
      render: (text) => <div className="ellipsis-text">{text}</div>,
    },
    {
      title: 'Qualification',
      dataIndex: 'qualification',
      key: 'qualification',
      ellipsis: true,
      width: '20%',
      render: (text) => <div className="ellipsis-text">{text}</div>,
    },
  ];

  return (
    <>
      <Typography.Text>
        <div className='recent'>
          <strong>Recent Beneficiairies </strong>
        </div>
      </Typography.Text>
      <div style={{ maxHeight: '680px', overflowY: 'auto', overflowX: 'auto'  , padding:'5px'}}>
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

export default Recentbeneficiaire;
