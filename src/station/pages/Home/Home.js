import { useEffect, useState } from 'react';
import Stats from '../../components/Dashboard/Stats/Stats';
import Greetings from '../../components/Dashboard/Greetings/Greetings';
import Users from 'station/components/Dashboard/UsersTable/Users';
import Stations from '../../components/StationsTable/Stations';
import axiosInstance from 'services/axiosInstance';
import { Button, Modal } from 'react-bootstrap';
import './Home.scss';

const Home = () => {
    const [stations, setStations] = useState([]);
    const [users, setUsers] = useState([]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [editModalVisibility, setEditModalVisibility] = useState(false);
    const [stationName, setStationName] = useState('');
    const [stationComment, setStationComment] = useState('');
    const [deleteStationVisibility, setDeleteStationVisibility] = useState(false);
    const [selectedStation, setSelectedStation] = useState(null);
    const [userModalVisibility, setUserModalVisibility] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userEditModalVisibility, setUserEditModalVisibility] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

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

    const handleEditStation = () => {
        axiosInstance.patch(`/api/station/${selectedStation.id}`, {
            name: selectedStation.name,
            comment: selectedStation.comment
        })
            .then(res => {
                if(res.data.statusCode === 200) {
                    setStations(res.data.stations);
                    setEditModalVisibility(false);
                    setSelectedStation(null);
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

    const handleStationFieldChange = (e, name) => {
        setSelectedStation((station) => ({
            ...station,
            [name]: e.target.value,
        }));
    }

    const handleUserFieldChange = (e, name) => {
        setSelectedUser(user => ({
            ...user,
            [name]: e.target.value
        }))
    }

    const handleEditUser = () => {
        axiosInstance.patch(`/api/user/${selectedUser.id}`, {
            name: selectedUser.name,
            email: selectedUser.email
        })
            .then(res => {
                if(res.data.statusCode === 200) {
                    setUsers(res.data.users);
                    setUserEditModalVisibility(false);
                }
            })
    }

    const handleAddUser = () => {
        axiosInstance.post("/api/user/signup", {
            name: userName,
            email: userEmail,
            password: userPassword
          })
            .then(res => {
              if(res.data.statusCode === 201) {
                setUsers(res.data.users);
                setUserModalVisibility(false);
              }
            })
    }

    return (
        <div className="home-section">
            <Greetings />
            <Stats />
            <Stations 
                stations={stations} 
                setModalVisibility={setModalVisibility}
                setEditModalVisibility={setEditModalVisibility}
                setDeleteStationVisibility={setDeleteStationVisibility}
                setSelectedStation={setSelectedStation}
            />
            <Users 
                users={users} 
                setSelectedUser={setSelectedUser}
                setUserModalVisibility={setUserModalVisibility}
                setUserEditModalVisibility={setUserEditModalVisibility}
            />
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
            {/* Edit Station Modal */}
            <Modal
                show={editModalVisibility}
                onHide={() => setEditModalVisibility(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Edit Station</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" className="form-control mb-3" name="name" placeholder="Station Name" value={selectedStation?.name} onChange={e => handleStationFieldChange(e, 'name')} />
                    <textarea name="" id="" cols="15" rows="5" className="form-control" name="comment" placeholder="Comment" value={selectedStation?.comment} onChange={e => handleStationFieldChange(e, 'comment')} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setEditModalVisibility(false)}>Close</Button>
                    <Button variant="success" onClick={handleEditStation}>Edit</Button>
                </Modal.Footer>
            </Modal>
            {/* Add User Modal */}
            <Modal
                show={userModalVisibility}
                onHide={() => setUserModalVisibility(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input 
                        type="text" 
                        className="form-control mb-3" 
                        placeholder="Name" 
                        value={userName} 
                        onChange={e => setUserName(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        className="form-control mb-3" 
                        placeholder="Email" 
                        value={userEmail} 
                        onChange={e => setUserEmail(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        className="form-control mb-3" 
                        placeholder="Password" 
                        value={userPassword} 
                        onChange={e => setUserPassword(e.target.value)} 
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setUserModalVisibility(false)}>Close</Button>
                    <Button variant="success" onClick={handleAddUser}>Create</Button>
                </Modal.Footer>
            </Modal>
            {/* Edit User Modal */}
            <Modal
                show={userEditModalVisibility}
                onHide={() => setUserEditModalVisibility(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input 
                        type="text" 
                        className="form-control mb-3" 
                        placeholder="Name" 
                        name="name"
                        value={selectedUser?.name} 
                        onChange={e => handleUserFieldChange(e, 'name')} 
                    />
                    <input 
                        type="email" 
                        className="form-control mb-3" 
                        placeholder="Email" 
                        name="email"
                        value={selectedUser?.email} 
                        onChange={e => handleUserFieldChange(e, 'email')} 
                    />
                    {/* <input 
                        type="password" 
                        className="form-control mb-3" 
                        placeholder="Password" 
                        value={selectedUser?.password} 
                        onChange={e => setUserPassword(e.target.value)} 
                    /> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setUserModalVisibility(false)}>Close</Button>
                    <Button variant="success" onClick={handleEditUser}>Edit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Home;