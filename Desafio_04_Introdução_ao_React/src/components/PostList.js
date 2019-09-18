import React, {
    Component
} from 'react';

import PostItem from './PostItem';

class PostList extends Component {
    state = {
        posts: [{
                id: 1,
                author: {
                    name: 'Talita Silveira',
                    avatar: 'https://avatars3.githubusercontent.com/u/13474201?s=460&v=4'
                },
                date: '10 setembro 2019',
                content: 'Consegui!!! Uhulllll!',
            comments: [{
                id: 2,
                author: {
                    name: 'Diego Fernandes',
                    avatar: 'https://avatars2.githubusercontent.com/u/2254731?v=4'
                },
                date: '10 setembro 2019',
                content: 'Que bom que conseguiu! Parabéns!'
            }, {
                id: 3,
                    author: {
                    name: 'Brad Traversy',
                    avatar: 'https://avatars0.githubusercontent.com/u/5550850?s=460&v=4',
                    },
                      date: '10 setembro 2019',
                          content: 'Ai sim!!Meus parabéns, continue assim e nunca desista dos seus sonhos!!(PS: I have to use Google Translator, sorry!)'
                },
                {
                    id: 4,
                    author: {
                        name: 'Loiane Groner',
                        avatar: 'https://avatars3.githubusercontent.com/u/59545?s=460&v=4'
                    },
                    date: '10 setembro 2019',
                    content: 'Parabéns Talita!  Com calma e perseverança sempre conseguimos! Continue codando sempre!'
                },
                {
                    id: 5,
                    author: {
                        name: 'Gustavo Nogueira',
                        avatar: 'https://avatars1.githubusercontent.com/u/2992073?s=460&v=4'
                    },
                    date: '10 setembro 2019',
                    content: 'Parabéns Meu Amor!  Eu sabia que conseguiria! Conte comigo sempre!'
                },
                {
                    id: 6,
                    author: {
                        name: 'Talita Silveira',
                        avatar: 'https://avatars3.githubusercontent.com/u/13474201?s=460&v=4'
                    },
                    date: '10 setembro 2019',
                    content: 'sObrigada amigos, sem vocês eu não teria conseguido! Obrigada a Todos! '
                },
                ],
            },
            
                ]
            }
        

    render() {
        const {  posts  } = this.state;

        return ( <  div className = "postlist" > {
                posts.map(post => ( < PostItem key = { post.id } { ...post }/>
                ))}
                </div>
        );
    }
}

export default PostList;