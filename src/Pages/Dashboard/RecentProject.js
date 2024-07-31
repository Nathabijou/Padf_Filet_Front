import React, { useState, useEffect } from 'react';
import { Table, Typography } from 'antd';
import { getRecentProject } from '../../Layout/API';

function RecentProject() {
  const [dataSource, setDatasource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getRecentProject();
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
      width: 300,
      render: (text) => <div className="ellipsis-text">{text}</div>,
    },
    {
      title: 'Latitude',
      dataIndex: 'latitude',
      key: 'latitude',
      ellipsis: true,
      idth: '20px',
      render: (text) => <div className="ellipsis-text">{text}</div>,
    },
    {
      title: 'Longitude',
      dataIndex: 'longitude',
      key: 'longitude',
      ellipsis: true,
      render: (text) => <div className="ellipsis-text">{text}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'statut',
      key: 'statut',
      ellipsis: true,
      render: (text) => <div className="ellipsis-text">{text}</div>,
    },
    {
      title: 'Quartier',
      dataIndex: 'quartierNom',
      key: 'quartierNom',
      ellipsis: true,
      render: (text) => <div className="ellipsis-text">{text}</div>,
    },
    {
      title: 'Zone',
      dataIndex: 'zoneNom',
      key: 'zoneNom',
      ellipsis: true,
      render: (text) => <div className="ellipsis-text">{text}</div>,
    },
  ];

  return (
    <>
      <Typography.Text>
        <div className='recent'>
          <strong> </strong>
        </div>
      </Typography.Text>
      <div className="table-container" style={{ marginLeft: '-48%', marginRight: '-50%', marginTop:'-11.2%', maxHeight: '50%',height:'100%', overflowY: 'auto' }}>
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

export default RecentProject;
