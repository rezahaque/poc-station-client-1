import { useEffect, useState } from 'react';
import Stats from '../../components/Dashboard/Stats/Stats';
import Greetings from '../../components/Dashboard/Greetings/Greetings';
import Users from 'station/components/Dashboard/UsersTable/Users';
import Stations from '../../components/StationsTable/Stations';
import axiosInstance from 'services/axiosInstance';
import './Home.scss';
import { Button, Modal } from 'react-bootstrap';

const Home = () => {
    const [stations, setStations] = useState([]);
    const [users, setUsers] = useState([]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [stationName, setStationName] = useState('');
    const [stationComment, setStationComment] = useState('');
    const [deleteStationVisibility, setDeleteStationVisibility] = useState(false);
    const [selectedStation, setSelectedStation] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        axiosInstance.get('/api/station', {
            signal: controller.signal
        })
            .then(res => {
                setStations(res.data.stations);
            })
        
        axiosInstance.get('/api/user', {
            signal: controller.signal
        })
            .then(res => {
                setUsers(res.data.users);
            })

        return () => controller.abort();
    }, [])

    const handleAddComment = () => {
        axiosInstance.post('/api/station', {
            name: stationName,
            comment: stationComment
        })
            .then(res => {
                if(res.data.statusCode === 201) {
                    setStations(res.data.stations);
                    setStationName('');
                    setStationComment('');
                    setModalVisibility(false);
                }
            })
    }

    const handleDeleteStation = () => {
        axiosInstance.delete(`/api/station/${selectedStation}`)
            .then(res => {
                setStations(res.data.stations);
                setDeleteStationVisibility(false);
            })
    }

    return (
        <div className="home-section">
            <Greetings />
            <Stats />
            <Stations 
                stations={stations} 
                setModalVisibility={setModalVisibility} 
                setDeleteStationVisibility={setDeleteStationVisibility}
                setSelectedStation={setSelectedStation}
            />
            <Users users={users} />
            {/* Add Station Modal */}
            <Modal
                show={modalVisibility}
                onHide={() => setModalVisibility(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Add Station</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" className="form-control mb-3" placeholder="Station Name" value={stationName} onChange={e => setStationName(e.target.value)} />
                    <textarea name="" id="" cols="15" rows="5" className="form-control" placeholder="Comment" value={stationComment} onChange={e => setStationComment(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalVisibility(false)}>Close</Button>
                    <Button variant="success" onClick={handleAddComment}>Create</Button>
                </Modal.Footer>
            </Modal>
            {/* Delete Station Modal */}
            <Modal
                show={deleteStationVisibility}
                onHide={() => setDeleteStationVisibility(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Delete Station</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete?</p>
                    <hr />
                    <div>
                        <Button onClick={() => setDeleteStationVisibility(false)}>Cancel</Button>
                        <Button variant="danger" onClick={handleDeleteStation} style={{ marginLeft: "10px"}}>Delete</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Home;