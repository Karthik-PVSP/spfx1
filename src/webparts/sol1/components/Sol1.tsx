import * as React from 'react';
import styles from './Sol1.module.scss';
import { ISol1Props } from './ISol1Props';
// import { escape } from '@microsoft/sp-lodash-subset';
import { Checkbox, Label, Pivot, PivotItem, Text } from '@fluentui/react';
// import { TextField } from '@fluentui/react';
import Card from './Card';
import {sampleData} from './sample'




// const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
//   root: { marginTop: 10 },
// };
interface ICheckboxState {
  name: string;
  value: boolean;
}
interface ISol1State {
  selectedTab: string | undefined;
  ServiceLine: ICheckboxState[];
  Level: ICheckboxState[];
}
interface IData {
  serviceLine: string;
  level: string;
  pivotlinkname: string;
  // Add other properties as needed
}
import { ServiceLine } from './enumTypes';
import { Level } from './enumTypes';
export default class Sol1 extends React.Component<ISol1Props, ISol1State> {

  constructor(props: ISol1Props) {
    super(props);
    // { name: "", value: false } as ICheckboxState
    this.state = {
      selectedTab: '',
      ServiceLine: [],
      Level: [],


    };
    this.showPivotElementsBasedOnTabName = this.showPivotElementsBasedOnTabName.bind(this);
    this.onChangeServiceLineHandler = this.onChangeServiceLineHandler.bind(this);
    this.filterSampleJSONData = this.filterSampleJSONData.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }
  public componentDidUpdate(prevProps: Readonly<ISol1Props>, prevState: Readonly<ISol1State>, snapshot?: any): void {
    if (this.state.ServiceLine !== prevState.ServiceLine) {
      console.log(this.state.ServiceLine);
    }
    console.log("from componentDidUpdate", this.state);

  }
  public onChangeServiceLineHandler(sectionType: "ServiceLine" | "Level", checkBoxName: string, checked: boolean | undefined): void {
    if (checkBoxName) {
      if(checked===true){
        this.setState({ ...this.state, [sectionType]: [...this.state[sectionType], { name: checkBoxName, value: checked }] } as Pick<ISol1State, keyof ISol1State>);

      }
      if(checked===false){
        let filteredOutitems = this.state[sectionType].filter((item)=>item.name!==checkBoxName);
        this.setState({ ...this.state, [sectionType]: filteredOutitems } as Pick<ISol1State, keyof ISol1State>);
      }
      console.log(this.state);
    }
  }
  public filterSampleJSONData<T extends IData>(data: T[]): T[] {
    let retunData: T[] = [];
    if (data.length > 0) {
      if (this.state.ServiceLine.some((item)=>item.value)) {
        let sLinesnames = this.state.ServiceLine.filter((item)=>item.value).map((item)=>item.name);
        retunData = data.filter((item: T) => sLinesnames.includes(item.serviceLine) );
      }
      else{
        retunData=data;
      }
      
      if (this.state.Level.some((item)=>item.value&&item.name!=="All")) {
        let levelsNames = this.state.Level.filter((item)=>item.value).map((item)=>item.name);
        retunData = retunData.filter((item: T) => levelsNames.includes(item.level))
          // [...,...data.filter((item: T) => levelsNames.includes(item.level))];
      }
      else if(this.state.Level.some((item)=>item.value&&item.name==="All")){
        retunData = data;
      }
      if (this.state.selectedTab) {
        retunData = retunData.filter((item: T) => item.pivotlinkname === this.state.selectedTab)
        // && item.level === this.state.Level.name && this.state.Level.value && item.pivotlinkname === this.state.selectedTab
      }
      // retunData.push(...data.filter((item: T) => ))
    }
    console.log(retunData)
    return retunData;
  }

  public showPivotElementsBasedOnTabName(): React.ReactElement<any> {
    return (<>{this.filterSampleJSONData<any>(sampleData).map((item: any, index: number) => {


      return <div style={{margin:"10px"}}><Card key={index} cpeCreditNumber={item.cpeCredit} description={item.description} iconName={item.iconName} image={item.image} link={item.link} tag={item.tag} time={item.time} title={item.title} /></div>
    })}</>);
    // switch (tabName) {
    //   case 'Tab 1':
    //     return <div>Content for Tab 1</div>;
    //   case 'Tab 2':
    //     return <div>Content for Tab 2</div>;
    //   case 'Tab 3':
    //     return <div>Content for Tab 3</div>;
    //   default:
    //     return <></>;
    // }
  }
  public handleLinkClick(item: PivotItem|undefined, ev?: React.MouseEvent<HTMLElement>): void {
    console.log("from handleLinkClick", item)
    if (item !== undefined) {
      this.setState({ selectedTab: item.props.headerText });
    }
  };

  public render(): React.ReactElement<ISol1Props> {
    // const {
    //   description,
    //   isDarkTheme,
    //   environmentMessage,
    //   hasTeamsContext,
    //   userDisplayName
    // } = this.props;

    return (

      <div className={styles.curriculumContainer}>
        <h1 className={styles.curriculumTitle}>Curriculum Roadmap</h1>
        <Text >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.</Text><br></br>
        <div style={{ marginBottom: '30px' }}></div>
        <Text >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.</Text>
        <div style={{ marginBottom: '30px' }}></div>
        <div className={styles['ms-Grid']}>
          <div className={styles['ms-Grid-row']}>
            <div className={styles['ms-grid-col-content']}>
              <div>
                <Text className={styles['ms-Text']}>Choose the service line</Text>
                <hr></hr>
              </div>

              {/* <div className={styles['ms-Grid']}> */}
              <div className={styles['leftcontent-Grid']}>
                {/* <div className={styles['ms-Grid-row']}> */}
                {/* <div className={styles['ms-Grid-col']}> */}
                <Checkbox label={ServiceLine.Advisory.toString()} onChange={(event, checked) => { this.onChangeServiceLineHandler("ServiceLine", ServiceLine.Advisory.toString(), checked) }} />
                {/* </div> */}
                {/* </div> */}
                {/* <div className={styles['ms-Grid-row']}> */}
                {/* <div className={styles['ms-Grid-col']}> */}
                <Checkbox label={ServiceLine.Audit_Assurance.toString()} onChange={(event, checked) => { this.onChangeServiceLineHandler("ServiceLine", ServiceLine.Audit_Assurance.toString(), checked) }} />
                {/* </div> */}
                {/* </div> */}
                {/* <div className={styles['ms-Grid-row']}> */}
                {/* <div className={styles['ms-Grid-col']}> */}

                <Checkbox label={ServiceLine.Tax.toString()} onChange={(event, checked) => { this.onChangeServiceLineHandler("ServiceLine", ServiceLine.Tax.toString(), checked) }} />
                {/* </div> */}
                {/* </div> */}
                {/* <div className={styles['ms-Grid-row']}> */}
                {/* <div className={styles['ms-Grid-col']}> */}

                <Checkbox label={ServiceLine.ICS.toString()} onChange={(event, checked) => { this.onChangeServiceLineHandler("ServiceLine", ServiceLine.ICS.toString(), checked) }} />
                {/* </div> */}
                {/* </div> */}


              </div>
            </div>
            <div className={styles['ms-grid-col-content']}>
              <Text className={styles['ms-Text']}>Click on the level you would like to explore</Text>
              <hr></hr>

              {/* <div className={styles['ms-Grid']} > */}
              <div className={styles['rightcontent-Grid']}>

                {/* <div className={styles['ms-Grid-row']}> */}
                {/* <div className={styles['ms-Grid-col']}> */}
                <Checkbox label={Level.All} onChange={(event, checked) => { this.onChangeServiceLineHandler("Level", Level.All.toString(), checked) }}/>
                {/* </div> */}
                {/* <div className={styles['ms-Grid-col']}> */}
                <Checkbox label={Level.Intern} onChange={(event, checked) => { this.onChangeServiceLineHandler("Level", Level.Intern, checked) }}/>
                {/* </div> */}
                {/* <div className={styles['ms-Grid-col']}> */}
                <Checkbox label={Level.Associate1} onChange={(event, checked) => { this.onChangeServiceLineHandler("Level", Level.Associate1, checked) }}/>
                {/* </div> */}
                {/* <div className={styles['ms-Grid-col']}> */}
                <Checkbox label={Level.Associate2} onChange={(event, checked) => { this.onChangeServiceLineHandler("Level", Level.Associate2, checked) }}/>
                {/* </div> */}
                {/* <div className={styles['ms-Grid-col']}> */}
                <Checkbox label={Level.SeniorAssociate1} onChange={(event, checked) => { this.onChangeServiceLineHandler("Level", Level.SeniorAssociate1, checked) }}/>
                {/* </div> */}
                {/* </div> */}


                {/* <div className={styles['ms-Grid-row']}> */}
                {/* <div className={styles['ms-Grid-col']}> */}
                <Checkbox label={Level.SeniorAssociate2} onChange={(event, checked) => { this.onChangeServiceLineHandler("Level", Level.SeniorAssociate2, checked) }}/>
                {/* </div> */}
                {/* <div className={styles['ms-Grid-col']}> */}
                <Checkbox label={Level.SeniorAssociate3} onChange={(event, checked) => { this.onChangeServiceLineHandler("Level", Level.SeniorAssociate3, checked) }}/>
                {/* </div> */}
                {/* <div className={styles['ms-Grid-col']}> */}
                <Checkbox label={Level.NewManager} onChange={(event, checked) => { this.onChangeServiceLineHandler("Level", Level.NewManager.toString(), checked) }}/>
                {/* </div> */}
                {/* <div className={styles['ms-Grid-col']}> */}
                <Checkbox label={Level.Manager} onChange={(event, checked) => { this.onChangeServiceLineHandler("Level", Level.Manager, checked) }}/>
                {/* </div> */}
                {/* <div className={styles['ms-Grid-col']}> */}
                <Checkbox label={Level.ExperiencedManager} onChange={(event, checked) => { this.onChangeServiceLineHandler("Level", Level.ExperiencedManager, checked) }}/>
                {/* </div> */}
                {/* </div> */}
                {/* <div className={styles['ms-Grid-row']}> */}
                {/* <div className={styles['ms-Grid-col']}> */}
                <Checkbox label={Level.SeniorManagerorDirector} onChange={(event, checked) => { this.onChangeServiceLineHandler("Level", Level.SeniorManagerorDirector, checked) }}/>
                {/* </div> */}
                {/* <div className={styles['ms-Grid-col']}> */}
                <Checkbox label={Level.PPMD} onChange={(event, checked) => { this.onChangeServiceLineHandler("Level", Level.PPMD, checked) }}/>
                {/* </div> */}
                {/* </div> */}
                {/* </div> */}
              </div>


            </div>
          </div>
        </div>
        <div className={styles['ms-Grid']}>
          <div className={styles['ms-Grid-row']}>
            <div className={styles['ms-Grid-col']}>
              <h2 className={styles.curriculumTitle}>My Learnings</h2>

            </div>
          </div>
        </div>
        <div className={styles['ms-Grid-row']}>
          <div className={styles['ms-Grid-col']}>
            <Pivot onLinkClick={(item,event)=>{this.handleLinkClick(item,event)}}>
              <PivotItem headerText="All Programs/Trainings" key="All Programs/Trainings">
                {/* <Label >All Programs/Trainings</Label> */}
                {this.showPivotElementsBasedOnTabName()}
                {/* styles={labelStyles} */}
              </PivotItem>
              <PivotItem headerText="MileStone Program"  key="MileStone Program">
                <Label >MileStone Program</Label>
                {this.showPivotElementsBasedOnTabName()}

                {/* styles={labelStyles} */}
              </PivotItem>
              <PivotItem headerText="Technical Training" key="Technical Training">
                <Label >Technical Training</Label>
                {this.showPivotElementsBasedOnTabName()}

                {/* styles={labelStyles} */}
              </PivotItem>
              <PivotItem headerText="Badge Completion" key="Badge Completion">
                <Label >Badge Completion</Label>
                {this.showPivotElementsBasedOnTabName()}

                {/* styles={labelStyles} */}
              </PivotItem>
              <PivotItem headerText="Other Required/Mandatory Training" key="Other Required/Mandatory Training">
                <Label >Other Required/Mandatory Training</Label>
                {this.showPivotElementsBasedOnTabName()}

                {/* styles={labelStyles} */}
              </PivotItem>
            </Pivot>
          </div>
        </div>
        {/* <Card cpeCreditNumber='' description='' iconName='' image='' link='' tag='' time='' title='' /> */}
      </div>);



    // <section className={`${styles.sol1} ${hasTeamsContext ? styles.teams : ''}`}>
    //   <div className={styles.welcome}>
    //     <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
    //     <h2>Well done, {escape(userDisplayName)}!</h2>
    //     <div>{environmentMessage}</div>
    //     <div>Web part property value: <strong>{escape(description)}</strong></div>
    //   </div>
    //   <div>
    //     <h3>Welcome to SharePoint Framework!</h3>
    //     <p>
    //       The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
    //     </p>
    //     <h4>Learn more about SPFx development:</h4>
    //     <ul className={styles.links}>
    //       <li><a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">SharePoint Framework Overview</a></li>
    //       <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank" rel="noreferrer">Use Microsoft Graph in your solution</a></li>
    //       <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank" rel="noreferrer">Build for Microsoft Teams using SharePoint Framework</a></li>
    //       <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank" rel="noreferrer">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
    //       <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank" rel="noreferrer">Publish SharePoint Framework applications to the marketplace</a></li>
    //       <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank" rel="noreferrer">SharePoint Framework API reference</a></li>
    //       <li><a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">Microsoft 365 Developer Community</a></li>
    //     </ul>
    //   </div>
    // </section>

  }
}
