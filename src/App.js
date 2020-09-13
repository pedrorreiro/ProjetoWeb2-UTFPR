import React from 'react';
import './App.css';
import './style.css';
import logo1 from './img/logo.svg';
import logo2 from './img/logo2.svg';
import menu from './img/menu.png';
import iconBanner from './img/iconBanner.png';
import playButton from './img/playButton.png';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: "",
            user: "",
            foto: "",
            msgErro: "",
            color: "",
            logado: false,
            displayErro: "none"
        }
    }

    coordRequest() {

        const axios = require('axios');

        axios.get('http://ip-api.com/json/' + this.state.meuIp)
            .then(((response) => {

                this.setState({
                    latitude: response.data.lat,
                    longitude: response.data.lon
                });


                console.log("Latitude: " + this.state.latitude);
                console.log("Longitude: " + this.state.longitude);
            }));


        //this.climaRequest();
    }

    myIpRequest() {

        const axios = require('axios');

        axios.get('https://api.ipify.org')
            .then(((response) => {

                var resposta = response.data;

                this.setState({
                    meuIp: resposta
                });
            }));

        this.coordRequest();

    }

    loginRequest() {
        this.setState({
            displayErro: "inline-block"
        })

        const axios = require('axios');

        let user = document.getElementById("user").value;
        let pass = document.getElementById("pass").value;

        axios.post('https://reqres.in/api/login', {
            email: user,
            password: pass
        }).then(((response) => {

            if (response.status === 200) {
                this.setState({
                    msgErro: "Login com sucesso!",
                    color: "green",
                    logado: true
                });

                console.log(response.status);
                console.log("Logado!");
                this.setLocalStorage(response.data.token);

                //compClima.climaRequest();

                document.getElementById("user").disabled = true;
                document.getElementById("pass").disabled = true;

                document.getElementById("user").value = "";
                document.getElementById("pass").value = "";

                document.getElementById("btnLogin").disabled = true;
                document.getElementById("btnCadastro").style.display = "none";

                document.getElementById("doisBr").style.display = "none";

                document.getElementById("right").style.display = "inline-block";

            }

        })).catch((error) => {
            console.log(error);
            console.log("Erro no login");

            this.setState({
                msgErro: "Erro no login!",
                color: "red"
            });
        });

    }

    cadastroRequest() {

        this.setState({
            displayErro: "inline-block"
        })

        const axios = require('axios');

        let user = document.getElementById("user").value;
        let pass = document.getElementById("pass").value;

        axios.post('https://reqres.in/api/register', {
            email: user,
            password: pass
        }).then(((response) => {

            if (response.status === 200) {
                this.setState({
                    msgErro: "Cadastro com sucesso!",
                    color: "green",
                });

                console.log(response.status);
                console.log("Sucesso no cadastro!");
            }

        })).catch((error) => {
            console.log("Erro no cadastro");

            this.setState({
                msgErro: "Erro no cadastro!",
                color: "red"
            });
        });

    }

    setLocalStorage(token) {
        localStorage.setItem("token", token);
    };

    jogoRequest(){

        const axios = require('axios');

        var id = document.getElementById("inputId").value;

        axios.get('https://xivapi.com/character/' + id)
            .then(((response) => {

                var usuario = response.data.Character.Name;
                var fotinha = response.data.Character.Portrait;

                this.setState({
                    user: usuario,
                    foto: fotinha
                })

            }));
    };

    pesquisarChar(){
        document.getElementById("dadosUser").style.display = "inline-block";

        this.jogoRequest();
    }

    render() {
        return (
            <div className="wrapper" resize={this.resize}>
                <header>
                    <div id="contentHeader">
                        <div className="imgsLogo">
                            <img id="logo1" src={logo1} alt="logo" />
                            <img id="logo2" src={logo2} alt="logo2" />
                        </div>

                        <nav className="navMain">
                            <ul>
                                <li className="itemBar">
                                    <a href="/#">Documentation</a>
                                </li>

                                <li className="itemBar">
                                    <a href="/#">Forge</a>
                                </li>

                                <li className="itemBar">
                                    <a href="/#">Ecosystem</a>

                                </li>

                                <li className="itemBar">
                                    <a href="/#">News</a>
                                </li>

                                <li className="itemBar">
                                    <a href="/#">Partners</a>
                                </li>

                                <Popup trigger={<button id="btnEntrar">Entrar</button>} modal position="right center">
                                    <div id="loginBox">

                                        <span>Email</span><br />
                                        <input id="user" /><br /><br />

                                        <span>Senha</span><br />
                                        <input id="pass" type="password" /><br /><br />

                                        <button id="btnCadastro" onClick={this.cadastroRequest.bind(this)}>Cadastrar</button>
                                        <span id="doisBr"><br /><br /></span>
                                        <button id="btnLogin" onClick={this.loginRequest.bind(this)}>Entrar</button>
                                        <div id="msgErro"><p style={{
                                            display: this.state.displayErro,
                                            textAlign: "center",
                                            border: "1px solid black",
                                            borderRadius: 7 + "px",
                                            paddingRight: 25 + "px",
                                            paddingLeft: 25 + "px",
                                            paddingTop: 5 + "px",
                                            paddingBottom: 5 + "px",
                                            backgroundColor: this.state.color,
                                            color: "white"
                                        }
                                        }>{this.state.msgErro}</p></div>

                                    </div>
                                </Popup>
                            </ul>
                        </nav>

                    </div>

                    <div id="hiddenMenu">
                        <img id="menuIcon" style={{ width: 40 + 'px' }} src={menu} alt="menunIcon" />

                        <ul>
                            <li className="itemBar">
                                <a href="/#">Documentation</a>
                            </li>

                            <hr />

                            <li className="itemBar">
                                <a href="/#">Forge</a>
                            </li>

                            <hr />

                            <li className="itemBar">
                                <a href="/#">Ecosystem</a>
                            </li>

                            <hr />

                            <li className="itemBar">
                                <a href="/#">News</a>
                            </li>

                            <hr />

                            <li className="itemBar">
                                <a href="/#">Partners</a>
                            </li>

                            <hr />

                            <li>
                            <Popup trigger={<button id="btnEntrar">Entrar</button>} modal position="right center">
                                    <div id="loginBox">

                                        <span>Email</span><br />
                                        <input id="user" /><br /><br />

                                        <span>Senha</span><br />
                                        <input id="pass" type="password" /><br /><br />

                                        <button id="btnCadastro" onClick={this.cadastroRequest.bind(this)}>Cadastrar</button>
                                        <span id="doisBr"><br /><br /></span>
                                        <button id="btnLogin" onClick={this.loginRequest.bind(this)}>Entrar</button>
                                        <div id="msgErro"><p style={{
                                            display: this.state.displayErro,
                                            textAlign: "center",
                                            border: "1px solid black",
                                            borderRadius: 7 + "px",
                                            paddingRight: 25 + "px",
                                            paddingLeft: 25 + "px",
                                            paddingTop: 5 + "px",
                                            paddingBottom: 5 + "px",
                                            backgroundColor: this.state.color,
                                            color: "white"
                                        }
                                        }>{this.state.msgErro}</p></div>

                                    </div>
                                </Popup>
                            </li>
                        </ul>
                    </div>
                </header>

                <div id="banner">

                    <img src={iconBanner} alt="iconBanner" />

                    <div>
                        <span>Laravel Vapor is now Available! Sign up today! -></span>
                    </div>

                </div>

                <div id="corpo">

                    <div id="left">

                        <div id="bigBox">

                            <div id="content">
                                <h1>The PHP Framework for Web Artisans</h1>

                                <p>Laravel is a web application framework with expressive, elegant syntax. We’ve already laid the foundation — freeing you to create without sweating the small things.</p>

                                <div id="botoes">
                                    <div id="vermelho">
                                        <span>Documentation</span>
                                    </div>

                                    <div id="branco">
                                        <div id="contentButton">
                                            <img style={{ height: 25 + "px" }} src={playButton} alt="playButton" />
                                            <span style={{ position: "relative", bottom: 7 + "px", marginLeft: 5 + "px", textAlign: "center" }}>Watch Laracasts</span>

                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div id="right">
                        <div>
                            <span><strong>ID: </strong></span>
                            <input id="inputId"/>
                            <button id="btnPesquisar" onClick={this.pesquisarChar.bind(this)}>Pesquisar</button><br/><br/>
                            <div id="dadosUser">
                                <div><strong>Usuário: </strong>{this.state.user}</div><br/>
                                <div><img id="fotoChar" src={this.state.foto} alt="foto do char"/></div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        );

    }
}
export default App;
