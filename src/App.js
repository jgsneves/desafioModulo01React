import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })  
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Teste ${Date.now()}`,
      techs: 'React e Node',
      url: 'http://www.google.com'
    });

    const singleRepository = response.data;

    setRepositories([...repositories, singleRepository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    // const repositoryIndex = repositories.findIndex(
    //   repo => repo.id === id
    // );

    // if (repositoryIndex < 0) {
    //   return null;
    // }

    // let newList = repositories;
    // newList.splice(repositoryIndex, 1)

    // setRepositories(newList);

    // console.log(repositories);

    const filteredRepositories = repositories.filter(repository => repository.id !== id);

    setRepositories(filteredRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
