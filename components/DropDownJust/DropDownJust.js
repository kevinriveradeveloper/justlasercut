import React , { useState } from 'react';
import { Accordion, Grid, Container, Header, Icon, Divider, Image, Button } from 'semantic-ui-react';
import { BASE_URL } from '../../constants/config';

const DropDownJust = ({ title , list = [], folder = '' }) => {
    const [selected,setSelected] = useState(0);
    
    const renderButtonPrimary = (option) => {
        const existButton = typeof option.buttons.primary !== 'undefined';
        if(!existButton) return;
        
        return (
            <Button primary style={{backgroundColor: `${option.buttons.primary.color}`}} content={option.buttons.primary.title} href="" />
        ) 
    };
    const renderButtonSecondary = (option) => {
        const existButton = typeof option.buttons.secondary !== 'undefined';
        if(!existButton) return;
        
        return (
            <Button primary style={{backgroundColor: `${option.buttons.primary.color}`}} content={option.buttons.secondary.title} href="" />
        ) 
    };
    return (
        <Container className="dropdownjust">
            <Grid columns="16">
                <Grid.Row>
                    <Grid.Column width="16">
                        <Header>
                            {title}
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Divider/>
                <Grid.Row className="dropdownjust__questions">
                    <Grid.Column width="14">
                        <Accordion fluid styled>
                            {
                                list.map((option,index) => {
                                    return(
                                        <>
                                            <Accordion.Title
                                                key={index}
                                                active={selected === 0}
                                                index={index}
                                                onClick={() => setSelected(index)}
                                            >
                                            <div className="custom-dropdown">
                                                <h3 className="custom-dropdown__title">{option.title}</h3>
                                                <Icon size="large" className="custom-dropdown__icon" name='plus' />
                                            </div>
                                            
                                            </Accordion.Title>
                                            <Accordion.Content className="custom-dropdown-content" active={selected === index}>
                                                <div className="custom-dropdown-content__container">
                                                    <div className="image">
                                                        <Image src={`${BASE_URL}/${option.image}`} alt={option.title} />
                                                    </div>
                                                    <div className="description">
                                                        <p>{option.description}</p>
                                                        <div>
                                                            {renderButtonPrimary(option)}
                                                            {renderButtonSecondary(option)}
                                                        </div>
                                                    </div>
                                                   
                                                </div>
                                            </Accordion.Content>
                                        </>
                                    )
                                })
                            }
                        </Accordion>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default DropDownJust;