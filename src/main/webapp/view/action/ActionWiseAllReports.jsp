<%@page import="org.apache.commons.text.StringEscapeUtils"%>
<%@page import="com.vts.pfms.FormatConverter"%>
<%@page import="com.ibm.icu.text.DecimalFormat"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1" import="java.util.*,com.vts.*,java.text.SimpleDateFormat,java.io.ByteArrayOutputStream,java.io.ObjectOutputStream"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<jsp:include page="../static/header.jsp"></jsp:include>
<spring:url value="/resources/css/action/actionWiseAllReports.css" var="actionWiseAllReports" />
<link href="${actionWiseAllReports}" rel="stylesheet" />
<spring:url value="/resources/css/action/actionCommon.css" var="actionCommon" />
<link href="${actionCommon}" rel="stylesheet" />
<title>Assignee List</title>

</head>
 
<body>
  <%
  FormatConverter fc=new FormatConverter(); 
  SimpleDateFormat sdf=fc.getRegularDateFormat();
  List<Object[]> AssigneeList=(List<Object[]>)request.getAttribute("StatusList");
  String ProjectId=(String)request.getAttribute("ProjectId");
  String ActionType=(String)request.getAttribute("ActionType");
  String Type=(String)request.getAttribute("Type");
  List<Object[]> ProjectList=(List<Object[]>)request.getAttribute("ProjectList");
 %>





<div class="container-fluid">
		<div class="row">
			<div class="col-md-12">
				<div class="card shadow-nohover">
					<div class="card-header mb-2">  

					<div class="row">
						<h4 class="col-md-4">
						<%if("F".equalsIgnoreCase(Type)){ %>Forwarded <%} %>
						<%if("C".equalsIgnoreCase(Type)){ %>Completed  <%} %>
						<%if("P".equalsIgnoreCase(Type)){ %>Pending    <%} %>
						<%if("D".equalsIgnoreCase(Type)){ %>Delayed  <%} %> Action Reports</h4>  
							<div class="col-md-8 div-margin" >
								 <table>
								 	<tr >
								 		
								 		<td>
											 Project :   &ensp;
										</td>
										
										<td>
											<form class="form-inline float-right" method="post" action="ActionWiseAllReport.htm" name="myform" id="myform" >
				                            	<select class="form-control selectdee width220" id="ProjectId" required="required" name="ProjectId" >
				    									<option disabled="true"  selected value="">Choose...</option>

				    									
				    										<% 
				    										if(ProjectList!=null && ProjectList.size()>0){
				    										for (Object[] obj : ProjectList) {
				    											String projectshortName=(obj[4]!=null)?" ( "+obj[4].toString()+" ) ":"";
				    										%>
														<option value="<%=obj[0]%>" <%if(obj[0].toString().equalsIgnoreCase(ProjectId)){ %>selected="selected" <%} %>><%=obj[2]!=null?StringEscapeUtils.escapeHtml4(obj[2].toString()):" - "%> <%= projectshortName!=null?StringEscapeUtils.escapeHtml4(projectshortName):" - " %></option>
															<%}} %>
				  								</select>
                            					<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" /> 
												<input type="hidden" name="ProjectId"  id="ProjectId" value="<%=ProjectId %>" /> 
												<input type="hidden" name="ActionType"  id="ActionType" value="<%=ActionType %>" />
												<input type="hidden" name="Type"  id="Type" value="<%=Type %>" />
											</form>	
								  		</td>
								 		
								 		<td>Action Type :   &ensp;</td>
								 		
								 		<td>
								 		  <form action="ActionWiseAllReport.htm" name="actiontypefrm" id="actiontypefrm" method="post">	
											<select class="form-control " id="ActionType" required="required" name="ActionType" onchange="submitForm('actiontypefrm');" >
								   				<%-- <option <%if("A".equalsIgnoreCase(ActionType)){ %>selected<%} %> value="A">All</option> --%>
								   				<option <%if("NA".equalsIgnoreCase(ActionType)){ %>selected<%} %> value="NA">Action</option>
								   				<option <%if("MA".equalsIgnoreCase(ActionType)){ %>selected<%} %> value="MA">Meeting</option>
								   				<option <%if("MLA".equalsIgnoreCase(ActionType)){ %>selected<%} %> value="MLA">Milestone</option>
								   				<option <%if("RK".equalsIgnoreCase(ActionType)){ %>selected<%} %> value="RK">Risk</option>								   				 
								   				<option <%if("IU".equalsIgnoreCase(ActionType)){ %>selected<%} %> value="IU">Issue</option>								   				 
								   				<option <%if("RC".equalsIgnoreCase(ActionType)){ %>selected<%} %> value="RC">Recommendation</option>								   				 
								  			</select>
								  			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" /> 
								  			<input type="hidden" name="ProjectId"  id="ProjectId" value="<%=ProjectId %>" /> 
											<input type="hidden" name="ActionType"  id="ActionType" value="<%=ActionType %>" />
											<input type="hidden" name="Type"  id="Type" value="<%=Type %>" />
								  			</form>	
								 		</td>
								 		
								 		
								 		<td>
											 Type :   &ensp;
										</td>
										
										<td>
											<form action="ActionWiseAllReport.htm" name="typefrm" id="typefrm" method="post">	
											<select class="form-control " id="Type" required="required" name="Type" onchange="submitForm('typefrm');" >
								   				<%-- <option <%if("A".equalsIgnoreCase(ActionType)){ %>selected<%} %> value="A">All</option> --%>
								   				<option <%if("P".equalsIgnoreCase(Type)){ %>selected<%} %> value="P">Pending</option>
								   				<option <%if("F".equalsIgnoreCase(Type)){ %>selected<%} %> value="F">Forwarded</option>
								   				<option <%if("C".equalsIgnoreCase(Type)){ %>selected<%} %> value="C">Completed</option>
								   				<option <%if("D".equalsIgnoreCase(Type)){ %>selected<%} %> value="D">Delayed</option>								   				 
								  			</select>
								  			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" /> 
								  			<input type="hidden" name="ProjectId"  id="ProjectId" value="<%=ProjectId %>" /> 
											<input type="hidden" name="ActionType"  id="ActionType" value="<%=ActionType %>" />
											<input type="hidden" name="Type"  id="Type" value="<%=Type %>" />
								  			</form>	
								  		</td>
										<td> 	 	
									   		  <a type="submit"  class="btn btn-sm back margin-left25" href="MainDashBoard.htm" > Back</a>
								   		</td>
					   			
					   			</tr>
							</table>
					   		</div>
		   				</div>	   							

					</div>
						
					
    					<div class="data-table-area mg-b-15">
							<div class="container-fluid">
								<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div class="sparkline13-list">
										<div class="sparkline13-graph">
											<div class="datatable-dashv1-list custom-datatable-overright">
												<div id="toolbar">
													
												</div>

												<table class="table table-bordered table-hover table-striped table-condensed" id="myTable12" >
													
													<thead>

														<tr class="text-center">
															<th>SN</th>
															<th class="text-left">Action No</th>	
															<th >PDC</th>																							
														 	<th >Assignee</th>					 	
														 	<th >Mob No</th>
														 	<th class="width-115px">Progress</th>
														</tr>
													</thead>
													<tbody>
														<%int count=1;
															if(AssigneeList!=null&&AssigneeList.size()>0)
															{
												   					for (Object[] obj :AssigneeList) 
												   					{ %>
												   					
																	<tr>
																		<td class="text-center"><%=count %></td>
																		<td >
																		<form action="ActionDetails.htm" method="POST" >
																				<button  type="submit" class="btn btn-outline-info"  formtarget="_blank" ><%=obj[2]!=null?StringEscapeUtils.escapeHtml4(obj[2].toString()):" - " %></button>
																			   <input type="hidden" name="ActionLinkId" value="<%=obj[13]%>"/>
																	           <input type="hidden" name="Assignee" value="<%=obj[3]%>,<%=obj[4]%>"/>
																	           <input type="hidden" name="ActionMainId" value="<%=obj[1]%>"/>
																	           <input type="hidden" name="ActionAssignId" value="<%=obj[0]%>"/>
																	           <input type="hidden" name="ActionNo" value="<%=obj[2]%>">
 																			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" /> 
																			
																			</form>  
                                                                        </td>
																		<td class="text-center"><%=obj[8]!=null?sdf.format(obj[8]):" - "%></td>																		
																		<td><%=obj[3]!=null?StringEscapeUtils.escapeHtml4(obj[3].toString()):" - "%>, <%=obj[4]!=null?StringEscapeUtils.escapeHtml4(obj[4].toString()):" - "%></td>
																	  	<td>Ext: <%=obj[5]!=null?StringEscapeUtils.escapeHtml4(obj[5].toString()):" - "%>, Mob: <%=obj[6]!=null?StringEscapeUtils.escapeHtml4(obj[6].toString()):" - "%></td>
																		<td class="td-styl "><%if(obj[14]!=null){ %>
															            <div class="progress div-progress" >
															            <div class="progress-bar progress-bar-striped width-<%=obj[14]%>" role="progressbar"  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" >
															            <%=StringEscapeUtils.escapeHtml4(obj[14].toString()) %>
															            </div> 
															            </div> <%}else{ %>
															            <div class="progress div-progress">
															            <div class="progress-bar progressbar" role="progressbar" >
															             Not Yet Started .
															            </div>
															            </div> <%} %></td>				
																	</tr>
																<% count++;
																	}									   					
															}%>
													</tbody>
												</table>												
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<br>
						<div class="card-footer" align="right">&nbsp;</div>
					</div>
				</div>
			</div>
		</div>

	
			
		

	
<script type='text/javascript'> 
function submitForm(frmid)
{ 
  document.getElementById(frmid).submit(); 
} 

$('#ProjectId').on('change',function(){
	
	$('#myform').submit();
})




$('#fdate').daterangepicker({
	"singleDatePicker" : true,
	"linkedCalendars" : false,
	"showCustomRangeLabel" : true,
	"cancelClass" : "btn-default",
	"maxDate" : new Date(),
	showDropdowns : true,
	locale : {
		format : 'DD-MM-YYYY'
	}
});





$('#tdate').daterangepicker({
	"singleDatePicker" : true,
	"linkedCalendars" : false,
	"showCustomRangeLabel" : true,
	"cancelClass" : "btn-default",
	"maxDate" : new Date(),
	
	showDropdowns : true,
	locale : {
		format : 'DD-MM-YYYY'
	}
});



function Prints(myfrm){
	
	 var fields = $("input[name='btSelectItem']").serializeArray();

	 
	  if (fields.length === 0){
		  myalert();
	 event.preventDefault();
	return false;
	}
	 
	
	
		 
	
		  return true;
	 
			
	}
	
$(document).ready(function(){
	  $("#myTable12").DataTable({
	 "lengthMenu": [  5,10,25, 50, 75, 100 ],
	 "pagingType": "simple",
	 "pageLength": 10

	});
});


</script>
<script type='text/javascript'> 
function submitForm(frmid)
{ 
  document.getElementById(frmid).submit(); 
} 
</script>



</body>
</html>