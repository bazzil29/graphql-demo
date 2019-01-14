import React, { Component } from 'react';
import uuid from 'uuid';
import './App.css';
import * as API from './APIServices';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    API.getTasks()
      .then(res => {
        const { tasks } = res.data;

        this.setState({ tasks })
      })
      .catch(err =>
        console.log(err)
      )
  }


  renderTasks = () => {
    const { tasks } = this.state;

    return tasks.map(e => {
      return (
        <div key={e.id} className="task">
          <button className="task-check" onClick={() => {
            this.handleDoneTask(e.id, !e.isDone)
          }}>{e.isDone ? "To do" : "Done"}</button>
          <div className={(e.isDone) ? "done-task" : "task-name"}>{e.name}</div>
          <button className="task-delete" onClick={() => {
            this.handleDeleteTask(e.id)
          }}>delete</button>
        </div>
      )
    })
  }

  handleCreateTask = () => {
    const value = this.refs.taskInput.value;
    if (!!value) {
      API.addTask(value)
        .then(res => {
          const tasks = res.data.add;
          this.setState({
            tasks
          })
        })

      this.refs.taskInput.value = '';
    }
  }

  handleDoneTask = (id, isDone) => {
    API.editTask(id, isDone)
      .then(res => {
        const tasks = res.data.edit;
        this.setState({
          tasks
        })
      })
  }

  handleDeleteTask = (id) => {
    API.deleteTask(id)
      .then(res => {
        const tasks = res.data.delete;
        this.setState({
          tasks
        })
      })
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <div className="title">Task Manager</div>
          <div className="create-task">
            <input type="text" id="task-input" placeholder="type your task" ref="taskInput" onKeyDown={(e) => {
              if (e.keyCode === 13) {
                this.handleCreateTask();
              }
            }} />
            <button id="create-task-button" onClick={this.handleCreateTask}>Create task</button>
          </div>
        </div>
        <div className="body">
          <div className="task-list">
            {
              this.renderTasks()
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
