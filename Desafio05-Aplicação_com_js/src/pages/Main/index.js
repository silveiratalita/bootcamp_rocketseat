import React, { Component } from 'react';
import { Form, SubmitButton, List } from './styles';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Container from '../../Components/Container';
export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: null,
    repoExist:false
  };

  //carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  //salvar os dados do localStorage
  componentDidUpdate(_, prevState) {
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

    this.setState({
      loading: true,
    });
    try {
      //verificar aqui se o esado ja tem esse repo

      this.state.repositories.map(repo => {
        if (this.state.newRepo === repo) {
          this.setState({ repoExist:true })
          throw new Error('O repositório já existe na sua lista, por favor, pesquise um repositório diferente ou acesse o já existente!')
        }
      } )
       const { newRepo, repositories } = this.state;
      const response = await api.get(`/repos/${newRepo}`);
      console.log(`passou aqui com status${response}`);
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
    } catch (err) {
      console.log(
        'Algo aconteceu, seu repositório não existe ou nao foi encontrado.',
        err
      );
      this.setState({
        error: true,
      });
      console.log('ERROR>>>', this.state.error);
   }
  };

  render() {
    const { newRepo, loading, repositories } = this.state;
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
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
