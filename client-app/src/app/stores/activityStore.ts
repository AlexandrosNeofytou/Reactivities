import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activities";
import { agent } from "../api/agent";
import { v4 as uuid } from 'uuid';
import { format } from "date-fns";

export class ActivityStore {
    activityRegistry = new Map<String, Activity>();
    selectedActivity: Activity | undefined = undefined;
    loading = false;
    initialLoading = false;
    editMode: boolean = false;

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => {
            return a.date!.getTime() - b.date!.getTime();
        });
    }

    get groupedActivites() {
        return Object.entries(this.activitiesByDate.reduce((activities, activity) => {
            const date = format(activity.date!,"dd MMM yyy");
            activities[date] = activities[date] ? [...activities[date], activity] : [activity]
            return activities;
        }, {} as { [key: string]: Activity[] }));
    }

    constructor() {
        makeAutoObservable(this);
    }

    setLoadingInitial = (state: boolean) => {
        this.initialLoading = state;
    }



    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();

        try {
            await agent.Activities.create(activity);

            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
            })
        } catch (error) {
            console.log(error);
        }

        runInAction(() => this.loading = false);

    }

    loadActivity = async (id: string): Promise<Activity> => {
        let activity = this.getActivity(id);

        if (activity) {
            this.selectedActivity = activity;

        }
        else {
            this.setLoadingInitial(true);

            try {

                activity = await agent.Activities.details(id);

                this.setActivity(activity);


                runInAction(() => {

                    this.selectedActivity = activity;
                })



            } catch (error: any) {
                throw new Error(error);
            }

            this.setLoadingInitial(false);



        }


        return activity;



    }



    updateActivity = async (activity: Activity) => {
        this.loading = true;

        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
            })
        } catch (error) {
            console.log(error);
        }
        runInAction(() => this.loading = false);

    }

    deleteActivity = async (id: string) => {
        this.loading = true;

        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false
                if (this.selectedActivity) { this.selectedActivity = undefined; }

            });


        } catch (error) {
            console.log(error);
        }

        runInAction(() => this.loading = false);


    }




    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const response = await agent.Activities.list();

            runInAction(() => { this.activityRegistry.clear(); });


            response.forEach(activity => {
                this.setActivity(activity)
            });

        } catch (error) {
            console.log(error);
        }

        this.setLoadingInitial(false);


    }

    private setActivity = (activity: Activity) => {
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }



}
