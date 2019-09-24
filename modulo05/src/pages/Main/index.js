import React, { Component } from 'react';
import { Container, Form, SubmitButton, List } from './styles';
import { FaGithubAlt, FaPlus ,FaSpinner} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';
export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false
  };

  //carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  };

  //salvar os dados do localStorage
  componentDidUpdate(_,prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = evento => {
    this.setState({ newRepo: evento.target.value });
  };
  handleSubmit = async evento => {
    evento.preventDefault();
    const { newRepo, repositories } = this.state;
    this.setState({
      loading: true
    });
    const response = await api.get(`/repos/${newRepo}`);
    const data = {
      name: response.data.full_name
    };
    this.setState({ loading: false });
    this.setState({
      repositories: [...repositories, data],
      newRepo: ''
    });
    console.log(response.data);
    console.log(this.state.newRepo);
  };
  render() {
    const { newRepo, loading ,repositories} = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            //recebe o estado
            value={newRepo}
            //muda o valor do estado
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={16} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
            </li>
              ))}
        </List>
      </Container>
    );
  }
}
