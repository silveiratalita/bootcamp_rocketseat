import React, { Component } from 'react';
import TechItem from './TechItem';
import { runInThisContext } from 'vm';
class TechList extends Component{
    // static defaultProps = {
    //     tech: 'oculto',
    // };
    //static PropTypes={
    //tech: proptypes.string.isRequired
   // }
    
    state = {
    newTech :' ',        
        techs: [
         
        ]
    };
    //Executado assim que o componente aparece em tela
    componentDidMount() {
        const techs = localStorage.getItem('techs');
        if (techs) {
            this.setState({techs:JSON.parse(techs)})
        }
    }
    //Executado sempre que houver alterações nas props ou no estado
    componentDidUpdate(_, prevState) {
        if (prevState.techs !== this.state.techs) {
            localStorage.setItem('techs',JSON.stringify(this.state.techs))
        }
    }
    //Executado quando o componente deixa de existir 
    componentWillUnmount() {
        
    }
    handInputChange = elementoDigitado => {
      
this.setState({newTech:elementoDigitado.target.value})
    }

    handleSubmit = eventoEnviarTexto => {
        eventoEnviarTexto.preventDefault();
        this.setState({
            techs: [...this.state.techs, this.state.newTech],
            newTech: ' '
        })
    }

    handleDelete = (tech) => {
        this.setState({techs:this.state.techs.filter(tec=> tec !== tech)})
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                   <ul>
                    {this.state.techs.map(tech => < TechItem key={tech} tech={tech} onDelete={()=>this.handleDelete(tech)} />)};                        
        
                </ul>
                <input
                    type='text'
                    onChange={this.handInputChange}
                    value={this.state.newTech} />
                
                <button type="submit">Enviar</button>
                </form>
        );
}
}
export default TechList;