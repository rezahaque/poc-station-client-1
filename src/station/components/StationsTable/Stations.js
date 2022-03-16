import React from 'react';
import { Button, Card } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import StationsTable from './StationsTable';
import { dealForecastByOwnerData } from 'data/dashboard/crm';
import "./Stations.scss";

const Stations = ({ stations, setModalVisibility, setDeleteStationVisibility }) => {
  return (
    <Card className="overflow-hidden mb-3">
        <div className="card-header">
            <h6 className="mb-0">All Stations</h6>
            <Button variant="success" onClick={() => setModalVisibility(true)}>Add Station</Button>
        </div>
        <Card.Body className="p-0">
            <StationsTable data={stations} setDeleteStationVisibility={setDeleteStationVisibility} />
        </Card.Body>
    </Card>
  );
};

export default Stations;
