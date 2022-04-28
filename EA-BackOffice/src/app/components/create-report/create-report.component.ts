import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from 'src/app/service/report.service';
import { Report } from 'src/app/models/report';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.css']
})
export class CreateReportComponent implements OnInit {

  reportForm: FormGroup;
  title = "Create Report";

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private toastr: ToastrService,
    private _reportService: ReportService,
    private aRouter: ActivatedRoute){
      this.reportForm = this.fb.group({
        reportingUser: ['', Validators.required],
        description: ['', Validators.required],
        code: ['', Validators.required]
      });
    }

  ngOnInit(): void {
      
  }

  addReport(){
      const report: Report = {
        reportingUser: this.reportForm.get('reportingUser')?.value,
        description: this.reportForm.get('description')?.value,
        code: this.reportForm.get('code')?.value,
      }

      console.log(report);

      this._reportService.addReport(report).subscribe(data => {
        this.toastr.success('Report successfully created!', 'Report created');
        this.router.navigate(['/list-reports']);
      }, error => {
        console.log(error);
        this.reportForm.reset();
      })
  }

}
