import styled from 'styled-components';

export const Loading = styled.div`
color:#FFF;
font-size:30px;
font-weight:bold;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
font-family:fantasy;
`;
export const Owner = styled.header`
         display: flex;
         flex-direction: column;
         align-items: center;
         a {
           color: #7159c1;
           font-size: 16px;
           text-decoration: none;
           font-family: fantasy;
         }
         img {
           width: 120px;
           border-radius: 50%;
           margin-top: 20px;
         }
         h1 {
           font-family: fantasy;
           font-size: 24px;
           margin-top: 10px;
         }
         p {
           margin-top: 5px;
           font-size: 14px;
           color: #666;
           line-height: 1.4;
           text-align: center;
           max-width: 400px;
           font-family: fantasy;
         }
       `;
export const IssueList = styled.ul`
padding-top: 30px;
margin-top: 15px 10 px;
border-top:1px solid #eee;
list-style:none;

li{
  display:flex;
  padding: 15px 10px;
  border: 1px solid #eee;
  border-radius:4px;

  &+li{
    margin-top:10px;
  }
  img{
    width:36px;
    height:36px;
    border-radius:50%;
    border: 2px solid #EEE;
  }
  div{
    flex:1;
    margin-left:15px;
    strong{
      font-size:16px;
      a{
      text-decoration:none;
      font-family:fantasy;
      color:#333;

      &:hover{
        color:#7159c1;
      }
    }
    span{
      background:#900;
      color: #eee;
      border-radius:50%;
      font-size:12px;
      font-weight:500;
      height:80px;
      padding:3px  4px;
      margin-left: 10px;
      font-family:fantasy;
    }
    }
    p{
      margin-top:5px;
      font-size:12px;
      color:#999;
    }
  }
}
`  ;
export const Button = styled.button.attrs(props => ({
         disable: props.page
       }))`
         padding: 25px;
         border-radius: 5px;
         font-size: 16px;
         cursor: pointer;
         margin-left:150px;

          &:hover {
           opacity: 0.7;
         }
       `;