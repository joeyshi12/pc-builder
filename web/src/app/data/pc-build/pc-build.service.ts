import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PcBuild } from "../../transfers/pc_build";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PcBuildService {
  constructor(private _http: HttpClient) {
  }

  public createPcBuild(build: PcBuild): Observable<PcBuild> {
    return this._http.post<PcBuild>("/builds", build);
  }

  public updatePcBuild(build: PcBuild): Observable<PcBuild> {
    return this._http.put<PcBuild>("/builds", build);
  }

  public getPcBuilds(ids?: string[]): Observable<PcBuild[]> {
    if (ids?.length === 0) {
      return of([]);
    }
    const params = [];
    if (ids && ids.length > 0) {
      params.push(`ids=${ids.join(",")}`);
    }
    const url = params.length > 0 ? `/builds?` + params.join("&") : "/builds";
    return this._http.get<PcBuild[]>(url);
  }

  public deletePcBuild(id: string): Observable<void> {
    return this._http.delete<void>(`/builds/${id}`);
  }
}
