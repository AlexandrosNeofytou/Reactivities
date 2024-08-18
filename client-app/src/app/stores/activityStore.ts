import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activities";
import { agent } from "../api/agent";
import {v4 as uuid} from 'uuid';

export class ActivityStore
{
    activityRegistry=new Map<String,Activity>();
    selectedActivity:Activity | undefined=undefined;
    loading=false;
    initialLoading=true;
    editMode:boolean=false;

    get activitiesByDate()
    {
        return Array.from(this.activityRegistry.values()).sort((a,b)=>{
            return Date.parse(a.date)-Date.parse(b.date);
        });
    }

    constructor(){
        makeAutoObservable(this);
    }

    setLoadingInitial=(state:boolean)=>{
        this.initialLoading=state;
    }

    setActivity=(id:string)=>{
        this.selectedActivity=this.activityRegistry.get(id);
    }

    cancelSelectedActivity=()=>{
        this.selectedActivity=undefined;
    }

    createActivity=async (activity:Activity)=>{
        this.loading=true;
        activity.id=uuid();

        try {
            await agent.Activities.create(activity);

            runInAction(()=>{
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity=activity;
                this.editMode=false;
            })
        } catch (error) {   
            console.log(error);
        }

        runInAction(()=>  this.loading=false);

    }

    updateActivitya=async(activity:Activity)=>{
        this.loading=true;
        
        try {
            await agent.Activities.update(activity);
            runInAction(()=>{
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity=activity;
                this.editMode=false;
            })
        } catch (error) {
            console.log(error);
        }
        runInAction(()=>  this.loading=false);
      
    }

    deleteActivity=async(id:string)=>{
        this.loading=true;

        try {
            await agent.Activities.delete(id);
            runInAction(()=> {
                this.activityRegistry.delete(id);
                this.loading=false
                if(this.selectedActivity){this.selectedActivity=undefined;}

            });


        } catch (error) {
            console.log(error);
        }

        runInAction(()=> this.loading=false);


    }

    openForm=(id?:string)=>{
        if(id)
        {
            this.setActivity(id);
        }
        else 
        {
            this.cancelSelectedActivity();
        }

        console.log(this.selectedActivity);
        this.editMode=true;
    }

    closeForm=()=>{
        this.editMode=false;

    }

    loadActivities=async ()=>{
        this.setLoadingInitial(true);
        try {
            const response=await agent.Activities.list(); 
            
            this.activityRegistry.clear();
            
            response.forEach(activity=>{
                activity.date=activity.date.split("T")[0];
                this.activityRegistry.set(activity.id,activity);

            });
            
        } catch (error) {
            console.log(error);
        }

        this.setLoadingInitial(false);


    }

    
}
