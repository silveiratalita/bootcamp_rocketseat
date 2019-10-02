import React from 'react';
import { Link } from 'react-router-dom';
import { Component } from 'react';
//import PropTypes from 'prop-types';
import { Loading, Owner, IssueList } from './styles';
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
                   loading: true,

                 }
                 async componentDidMount() {
                   const { match } = this.props;
                   const repoName = decodeURIComponent(match.params.repository);

                   const [repository, issues] = await Promise.all([
                     api.get(`/repos/${repoName}`),
                     api.get(`/repos/${repoName}/issues`, {
                       params: {
                         state: 'open',
                         per_page: 5
                       }
                     })
                   ]);

                   this.setState({
                     repository: repository.data,
                     issues: issues.data,
                     loading: false
                   });
                 }

                 render() {
                   const { repository, loading, issues } = this.state;

                   //issue
                   if (loading) {
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
                     </Container>
                   );
                 }
               }
