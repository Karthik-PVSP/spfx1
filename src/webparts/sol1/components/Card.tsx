import { Icon } from '@fluentui/react/lib/Icon';
import * as React from 'react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import cardStyles from './Card.module.scss';
import { Checkbox, DefaultButton, IButtonStyles } from '@fluentui/react';

initializeIcons();
export interface ICardProps {
  iconName: string;
  title: string;
  tag: string;
  time: string;
  cpeCreditNumber: string;

  description: string;
  image: string;
  link: string;
}
const Card: React.FC<ICardProps> = (props) => {
  interface TagStyles {
    [key: string]: {
      backgroundColor: string;
      color: string;
      fontweight: string;
      display:string;
      alignItems:string;
    };
  }
  const purpleButtonStyles: IButtonStyles = {
    root: {
      backgroundColor: '#6c2c9e',
      color: 'white',
      borderRadius: '4px',
      border: 'none',
      padding: '8px 16px',
      fontWeight: 'bold',
      // float: 'right',
      selectors: {
        ':hover': {
          backgroundColor: '#8c4fb6',
          color: 'white',
        },
        ':active': {
          backgroundColor: '#4c1c6d',
          color: 'white',
        },
      },
    },
  };
  
  const styleLookup: TagStyles = {
    milestone: {
      backgroundColor: '#FEDBD0',
      color: '#E74C3C',
      fontweight: 'bold',
      display: 'inline',
      alignItems: 'center'
    },
    technical: {
      backgroundColor: '#D6EAF8',
      color: '#2980B9',
      fontweight: 'bold',
      display: 'inline',
      alignItems: 'center'
    },
    badge: {
      backgroundColor: '#D5F5E3',
      color: '#2ECC71',
      fontweight: 'bold',
      display: 'inline',
      alignItems: 'center',
    },
    pdf: {
      backgroundColor: '#FDEBD0',
      color: '#E67E22',
      fontweight: 'bold',
      display: 'inline',
      alignItems: 'center',
    },
  };
  // const styleLookup={
  //   "milestone":{backgroundColor:"purple",color:"white",fontweight:"bold"},
  //   "technical":{backgroundColor:"yellow",color:"white",fontweight:"bold"},
  //   "badge":{backgroundColor:"green",color:"white",fontweight:"bold"},
  //   "pdf":{backgroundColor:"black",color:"white",fontweight:"bold"},
  // }

  return (
    <div className={cardStyles.Card}>
      <Icon iconName={props.iconName} styles={{
        root: {
          fontSize: '96px',
        },
      }}></Icon>
      <div>
      <div className={cardStyles['Card-Container1']}>
        <h5>{props.title}</h5>
        <div><Checkbox
          label='Mark as complete'
          styles={{
            text: {
              marginRight: '30px',
              order: 1, // Set the order of the label to 2 to move it to the left side
            },
            label: {
              order: 2, // Set the order of the checkbox to 1 to move it to the right side
            },
          }}
        /></div>
      </div>
      <div className={cardStyles['Card-Container2']}>
        <p ><span style={props.tag?styleLookup[props.tag]:{}}>{props?.tag?.toString().toUpperCase()}</span></p>

        <p><b>Time: </b>{props?.time}</p>
        <p><b>CPE Credit: </b>{props?.cpeCreditNumber}</p>
      </div>

      {/* i want to have below container 3 elements on same line at opposite ends  */}

      <div className={cardStyles['Card-Container3']}>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sed quia  </p>
      <div style={{marginRight:"60px"}}><DefaultButton text='Register' styles={purpleButtonStyles}></DefaultButton></div>
      </div>
      </div>
    </div>
  );


}
export default Card;