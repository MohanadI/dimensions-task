import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';

const SubMenu = Menu.SubMenu;
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    componentDidMount() {
        fetch("http://demo9606913.mockable.io/menu")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
                        current: 'home'
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
    renderElement(item){
        if(item.children.length === 0) {
            return <Menu.Item key={item.title}>{item.title}</Menu.Item>;
        }else{
            return <SubMenu key={"sub"+item.title} title={<span><span>{item.title}</span></span>}>
                {item.children.map((subItem) => (
                    this.renderElement(subItem)
                ))}
            </SubMenu>;
        }
    }
    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    style={{ width: 256 }}
                    mode="inline"
                >
                    {items.map((item) => (
                        this.renderElement(item)
                    ))}
                </Menu>
            );
        }
    }
}

export default Sidebar;