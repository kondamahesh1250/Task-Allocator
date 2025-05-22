import { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function AgentListView() {
  const [groupedTasks, setGroupedTasks] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }

    axios.get('http://localhost:5000/api/my-lists')
      .then(res => setGroupedTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = () => {
    axios.delete('http://localhost:5000/api/deletelists')
      .then(res =>
        setGroupedTasks([]))
      .catch(err =>
        console.error(err));
  }

  console.log(groupedTasks)

  return (
    <div className="task-list-container">
      <h2 className="title">Agent-wise List Distribution</h2>
      {
        groupedTasks.length > 0 ?
          <button className="btn-del" onClick={handleDelete}>Remove All</button>
          : null
      }
      <br /><br /><br />
      {groupedTasks.length > 0 ? (
        <>
          {groupedTasks.map((group, index) => (
            <div key={group.agent._id || index} className="agent-group">
              <h3 className="agent-name">
                {group.agent.name} - ({group.agent.email})
              </h3>
              <table className="task-table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Phone</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {group.tasks.map(task => (
                    <tr key={task._id}>
                      <td>{task.firstName}</td>
                      <td>{task.phone}</td>
                      <td>{task.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/17134/17134606.png"
            alt="No Data"
            width={200}
          />
        </div>
      )}
    </div>
  );

}

export default AgentListView;
