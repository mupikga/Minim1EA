import { Component, OnInit } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Activity } from 'src/app/models/activity';
import { User } from 'src/app/models/user';
import { ActivityService } from 'src/app/service/activity.service';
import { Toast, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { Report } from 'src/app/models/report';
import { ReportService } from 'src/app/service/report.service';

@Component({
  selector: 'app-list-reports',
  templateUrl: './list-reports.component.html',
  styleUrls: ['./list-reports.component.css']
})
export class ListReportsComponent implements OnInit {

  listReports: Report[] = [];

  constructor(private _reportService: ReportService, private toastr: ToastrService, private _userService: UserService) { }

  ngOnInit(): void {
    this.getReports();
  }

  getReports(){
    this._reportService.getReports().subscribe(data => {
      console.log("getReports() successful");
      console.log(data);
      this.listReports = data;
    }, error => {
      console.log(error);
    })
  }

  deleteReport(reportId: string){
    const confirmDelete = confirm("Report "+reportId+" will be deleted, do you want to continue?");
    if(confirmDelete===true){
      this._reportService.deleteReport(reportId).subscribe(data => {
        this.toastr.success('Report successfully deleted', 'Report deleted');
        this.getReports();
      }, error => {
        this.toastr.error("Report can not be deleted, please try again","Error deleting report");
        console.log(error);
      })
    }    
  }

  


}
