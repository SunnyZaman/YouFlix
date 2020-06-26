import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";

export default class YouTubeGet {
    getVideos(endpoint, filter) {
        const url = `${endpoint}?key=${process.env.VUE_APP_API_KEY}&${filter}`;
        return ajax.getJSON(url).pipe(
            map(response => response),
            catchError(error => of(error))
        );
    }

}