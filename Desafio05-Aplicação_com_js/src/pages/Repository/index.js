import React from 'react';
import { Link } from 'react-router-dom';
import { Component } from 'react';
//import PropTypes from 'prop-types';
import { Loading, Owner, IssueList, Button } from './styles';
import api from '../../services/api';
import Container from '../../Components/Container';


export default class Repository extends Component {
                 //   static propTypes = {
                 //     match: proptypes.shape({
                 //       params: PropTypes.shape({
                 //     repository:Proptypes.string,
                 //   }),
                 // }).isRequired,
                 //   };
                 state = {
                   repository: {},
                   issues: [],
                   page: 1,
                   loading: true,
                   selected: "",
                 };
  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const selected = decodeURIComponent(match.params.selected);
    const page = match.params.page;



    console.log('CHEGOU AQUI >>>', match);

                   const [repository, issues] = await Promise.all([
                     api.get(`/repos/${repoName}`),
                     api.get(`/repos/${repoName}/issues?state=${selected}`, {
                       params: {
                         state: selected,
                          per_page: 2
                       }
                     })
                   ]);

                   this.setState({
                     repository: repository.data,
                     issues: issues.data,
                     loading: false,
                     page: page + 1

                   });
                 }

                 render() {
                   const { repository, loading, issues,page } = this.state;

                   //issue
                   if (loading) {
                     console.log('chamando apis');
                     return <Loading>Carregando</Loading>;
                   }

                   return (
                     <Container>
                       <Owner>
                         <Link to="/">Voltar aos repositórios</Link>
                         <img
                           src={repository.owner.avatar_url}
                           alt={repository.owner.login}
                         />
                         <h1>{repository.name}</h1>
                         <p>{repository.description}</p>
                       </Owner>

                       <IssueList>
                         {issues.map(issue => (
                           <li key={String(issues.id)}>
                             <img
                               src={issue.user.avatar_url}
                               alt={issue.user.login}
                             />
                             <div>
                               <strong>
                                 <a href={issue.html_url}>{issue.title}</a>
                                 {issue.labels.map(label => (
                                   <span key={String(label.id)}>
                                     {label.name}
                                   </span>
                                 ))}
                               </strong>
                               <p>{issue.user.login}</p>
                             </div>
                           </li>
                         ))}
                       </IssueList>
                       <Button page={page}>
                         <button onClick={page}>Anterior</button>
                       </Button>

                       <Button page={page}>
                         <button onclick={page}>Próxima</button>
                       </Button>
                     </Container>
                   );
                 }
               }
