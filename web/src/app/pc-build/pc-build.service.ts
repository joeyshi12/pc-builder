import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PcBuild } from "../transfers/pc_build";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PcBuildService {
  constructor(private http: HttpClient) {
  }

  public createPcBuild(build: PcBuild): Observable<PcBuild> {
    return this.http.put<PcBuild>("/builds", build);
  }

  public getPcBuilds(ids?: string[], username?: string): Observable<PcBuild[]> {
    if (ids?.length === 0) {
      return of([]);
    }
    const params = [];
    if (ids && ids.length > 0) {
      params.push(`ids=${ids.join(",")}`);
    }
    if (username) {
      params.push(`user=${username}`);
    }
    const url = params.length > 0 ? `/builds?` + params.join("&") : "/builds";
    return this.http.get<PcBuild[]>(url);
  }
}
