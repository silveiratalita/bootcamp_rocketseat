import React, { Component } from 'react';
import { Form, SubmitButton, List } from './styles';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Container from '../../Components/Container';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: null,
    repoExist: false,
    selected: ""
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

   _onSelect = async option=> {
     console.log('passou no onselect', option)
     this.setState({ selected: option.value });
     console.log(this.state.selected)
  }

  handleSubmit = async evento => {
    evento.preventDefault();
    const { newRepo, repositories } = this.state;
    this.setState({ loading: true });
    try {
      //verificar aqui se o esado ja tem esse repo

      this.state.repositories.map(repo => {
         if (newRepo === repo.name) {
           this.setState({ repoExist: true });
          throw new Error(
            'O repositório já existe na sua lista, por favor, pesquise um repositório diferente ou acesse o já existente!'
          );
         }
        return repositories;
      });
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
    } catch (err) {
      console.log(
        'Algo aconteceu, seu repositório não existe ou nao foi encontrado.',
        err
      );
      this.setState({ error: true });
      console.log('ERROR>>>', this.state.error);
    }
  };

  render() {
    const options = [
       { value: 'all', label: 'Todas as Issues' },
      { value: 'open', label: 'Issues Abertas' },
      { value: 'closed', label: 'Issues Fechadas' }
    ];
    const defaultOption = options[0];
    const { newRepo, loading, repositories, selected } = this.state;

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
              <Link to={`/repository/${encodeURIComponent(repository.name)}/issues/${encodeURIComponent(selected)}`}>  Ver issues  </Link>
              <Dropdown
                placeholder="Selecione uma opção"
                options={options}
                onChange={this._onSelect}
                value={defaultOption}
              />
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
