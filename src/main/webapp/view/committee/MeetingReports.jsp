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

 

<title>Meeting Reports</title>
<style type="text/css">
label{
font-weight: bold;
  font-size: 13px;
}
body{
background-color: #f2edfa;
overflow-x:hidden !important; 
}
h6{
	text-decoration: none !important;
}
.table button{
	
	background-color: white !important;
	border: 3px solid #17a2b8;
	padding: .275rem .5rem !important;
}

.table button:hover {
	color: black !important;
	
}
#table tbody tr td {
	    padding: 4px 3px !important;
}


</style>
</head>
 
<body>
  <%
  FormatConverter fc=new FormatConverter(); 
  SimpleDateFormat sdf=fc.getRegularDateFormat();
 
  String Term=(String)request.getAttribute("Term");
  String projectid=(String)request.getAttribute("projectid");
  String divisionid=(String)request.getAttribute("divisionid");
  String initiationid=(String)request.getAttribute("initiationid");
  String typeid=(String)request.getAttribute("typeid");
  
  List<Object[]> ProjectsList=(List<Object[]>) request.getAttribute("ProjectList");
  List<Object[]> initiationlist=(List<Object[]>) request.getAttribute("initiationlist");
  List<Object[]> divisionlist=(List<Object[]>) request.getAttribute("divisionlist");
  List<Object[]> MeetingReports=(List<Object[]>) request.getAttribute("MeetingReports");
  
 %>



<%String ses=(String)request.getParameter("result"); 
 String ses1=(String)request.getParameter("resultfail");
 if(ses1!=null){
	%>
	<center>
	<div class="alert alert-danger" role="alert" >
                     <%=ses1 %>
                    </div></center>
	<%}if(ses!=null){ %>
	<center>
	<div class="alert alert-success" role="alert"  >
                     <%=ses %>
                   </div></center>
                    <%} %>

    <br/>


<div class="container-fluid">
		<div class="row">
			<div class="col-md-12">
				<div class="card shadow-nohover">
					<div class="card-header ">  

					<div class="row">
						<h4 class="col-md-3">Meeting Reports</h4>  
							<div class="col-md-9" style="float: right;">
					   		
		   					</div>
		   				</div>	   							
					</div>
				
					<div class="card-body">
					
						<div class="row">
							
		   					<div class="col-md-3" >
		   					<form method="post" action="MeetingReports.htm"  id="fieldform">
	   							<label class="control-label" style="font-size: 17px; ">Term: </label>
			   						
	                       	 	<select class="form-control items " name="term"  required="required" id="term" data-live-search="true"  onchange="changeterm()" >
										<option value="T" <%if("T".equalsIgnoreCase(Term)){ %> selected="selected" <%} %>>Today</option>	
										<option value="E" <%if("E".equalsIgnoreCase(Term)){ %> selected="selected" <%} %>>Tomorrow</option>	
										<option value="S" <%if("S".equalsIgnoreCase(Term)){ %> selected="selected" <%} %> >Next 7 Days</option>		
								</select>
                          	</div>
                          	<div class="col-md-3" >
					   			<label class="control-label" style="font-size: 17px; ">Type: </label>
					   					
                                <select class="form-control items" id="typeid" required="required" name="typeid" onchange="projectfieldchange();" >
							   		<option value="A" <%if("A".equalsIgnoreCase(typeid)){ %> selected="selected" <%} %> >ALL</option>
							   		<option value="G" <%if("G".equalsIgnoreCase(typeid)){ %> selected="selected" <%} %> >General</option>
									<option value="P" <%if("P".equalsIgnoreCase(typeid)){ %> selected="selected" <%} %> >Project</option>
							   		<option value="D" <%if("D".equalsIgnoreCase(typeid)){ %> selected="selected" <%} %> >Division</option>
							   		<option value="I" <%if("I".equalsIgnoreCase(typeid)){ %> selected="selected" <%} %> >Initiated Project</option>
					  			</select>
					  			<input type="hidden" name="initiationid" value="0" />
								<input type="hidden" name="divisionid" value="0" />
								<input type="hidden" name="projectid" value="0" />
								<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
					  		</form>
					  		</div>
					  		
                            <div class="col-md-3">
                            		<%if(typeid.equals("P")){ %>
		                            <div   id="projectdiv" style="display: block; width:100%;">
		                            <%}else{ %>
		                            <div   id="projectdiv" style="display: none; width:100%;">
		                            <%} %>
			                            <form method="post" action="MeetingReports.htm"  id="proform">
								   			<label class="control-label" style="font-size: 17px; ">Project: </label>
			                                <select class="form-control items" id="projectid" style="width: 100%"  name="projectid" required="required"  onchange="submitForm('proform');">
												<option value="" disabled="disabled" selected >Choose...</option>
												<option value="A" <%-- <%if(projectid.equalsIgnoreCase("A")){ %>selected<% }%> --%> >All</option>
										   		<% for (Object[] obj : ProjectsList) {%>
													<option value="<%=obj[0]%>" <%if(obj[0].toString().equals(projectid)){ %>selected<%  } %>  ><%=obj[4] %></option>
												<%} %>
								  			</select>
								  			<input type="hidden" name="initiationid" value="0" />
								  			<input type="hidden" name="divisionid" value="0" />
								  			<input type="hidden" name="term" id="termp" value="<%=Term %>" />
								  			<input type="hidden" name="typeid" id="typeidp" value="<%=typeid %>" />
								  			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
								  		</form>
							  		</div>
							  		
							  		<%if(typeid.equals("D")){ %>
		                            <div   id="divisiondiv" style="display: block; width:100%;">
		                            <%}else{ %>
		                            <div   id="divisiondiv" style="display: none; width:100%;">
		                            <%} %>
							  			<form method="post" action="MeetingReports.htm"  id="divform" > 	
								   			<label class="control-label" style="font-size: 17px;">Division: </label>
								   						
			                              	<select class="form-control items" id="divisionid" " style="width: 100%" name="divisionid" required="required"  onchange="submitForm('divform');">
												<option value="" disabled="disabled" selected >Choose...</option>
												<option value="A" <%-- <%if(divisionid.equalsIgnoreCase("A")){ %>selected<% }%> --%> >All</option>
										   		<% for (Object[] obj : divisionlist) {%>
													<option value="<%=obj[0]%>" <%if(obj[0].toString().equals(divisionid)){ %>selected<% } %>  ><%=obj[1]%>(<%=obj[4] %>)</option>
												<%} %>
								  			</select>
								  			<input type="hidden" name="initiationid" value="0" />
								  			<input type="hidden" name="projectid" value="0" />
								  			<input type="hidden" name="term" id="termd" value="<%=Term %>" />
								  			<input type="hidden" name="typeid" id="typeidd" value="<%=typeid %>" />
								  			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
								  		</form>
							  		</div>
							  		<%if(typeid.equals("I")){ %>
		                            <div   id="initiationdiv" style="display: block; width:100%;">
		                            <%}else{ %>
		                            <div   id="initiationdiv" style="display: none; width:100%;">
		                            <%} %>
							  			<form method="post" action="MeetingReports.htm"  id="initform">		
								   			<label class="control-label" style="font-size: 17px; ">Initiation: </label>
								   					
			                               	<select class="form-control items"  id="initiationid" style="width: 100%"  name="initiationid" required="required"  onchange="submitForm('initform');" >
												<option value="" disabled="disabled" selected >Choose...</option>
												<option value="A" <%--  <%if(initiationid.equalsIgnoreCase("A")){ %>selected<% }%> --%> >All</option>
										   		<% for (Object[] obj : initiationlist ) {%>
												<option value="<%=obj[0]%>" <%if(obj[0].toString().equals(initiationid)){ %>selected<% } %>  ><%=obj[1]%>(<%=obj[4] %>)</option>
												<%} %>
								  			</select>
								  			<input type="hidden" name="divisionid" value="0" />
								  			<input type="hidden" name="projectid" value="0" />
								  			<input type="hidden" name="typeid" id="typeidi" value="<%=typeid %>" />
								  			<input type="hidden" name="term" id="termi" value="<%=Term %>" />
								  			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
							  			</form>
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
												<table id="table" data-toggle="table" data-pagination="true"
													data-search="true" data-show-columns="true"
													data-show-pagination-switch="true" data-show-refresh="true"
													data-key-events="true" data-show-toggle="true"
													data-resizable="true" data-cookie="true"
													data-cookie-id-table="saveId" data-show-export="true"
													data-click-to-select="true" data-toolbar="#toolbar">
													<thead>

														<tr>
															<th>SN </th>
															<th>Meeting Id</th>
															<th>Date & Time</th>
															<th>Committee</th>																							
														 	<th >Venue</th>					 	
														 	<!-- <th >Role</th> -->
														</tr>
													</thead>
													<tbody>
														<%int count=1;
															if(MeetingReports!=null&&MeetingReports.size()>0)
															{
												   				for (Object[] obj :MeetingReports) 
												   				{ %>
																<tr>
																	<td class="center" ><%=count %></td>
																	<td>
																		<form action="CommitteeMinutesViewAll.htm" >
																			<button  type="submit" class="btn btn-outline-info" formtarget="_blank" ><%=obj[5] %></button>
																			<input type="hidden" name="committeescheduleid" value="<%=obj[0] %>" />
																		</form>
																	</td>
																	<td><%=sdf.format(obj[1])%> - <%=obj[2]%></td>																		
																	<td><%=obj[4]%></td>
																  	<td> <%if(obj[6]!=null){ %> <%=obj[6]%><%}else{ %>-<%} %></td>
																	<%-- <td>
																		<%if("CS".equalsIgnoreCase(obj[6].toString())){ %> Member Secretary <%} %>
																		<%if("CC".equalsIgnoreCase(obj[6].toString())){ %> Chairperson <%} %>
																		<%if("P".equalsIgnoreCase(obj[6].toString())){ %> Presenter <%} %>
																		<%if("CI".equalsIgnoreCase(obj[6].toString())){ %> Committee Member <%} %>																		
																		<%if("I".equalsIgnoreCase(obj[6].toString())){ %> Internal Member<%} %>
																	</td>		 --%>
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
					</div>
						<br>
						<div class="card-footer" align="right">&nbsp;</div>
					</div>
				</div>
			</div>
		</div>

						
					<script type="text/javascript">
					
					function changeterm(){
						var term=$('#term').val();
						$("#termp").val(term);
						$("#termd").val(term);
						$("#termi").val(term);
						var typeid=$('#typeid').val();
						if(typeid=='A' || typeid=='G'){
							
							submitForm('fieldform');
						}
						
					}
					
					function projectfieldchange()
					{
						
						var typeid=$('#typeid').val();
						$("#typeidp").val(typeid);
						$("#typeidd").val(typeid);
						$("#typeidi").val(typeid);
													
											
						if(typeid=='A' || typeid=='G'){
							
							submitForm('fieldform');
						}
						
						if(typeid=='P'){
							console.log('P');
							$("#divisiondiv").hide();
							$("#initiationdiv").hide();
							$("#projectdiv").show();
						}		
						
						if(typeid=='D'){
							console.log('D');							
							$("#initiationdiv").hide();
							$("#projectdiv").hide();
							$("#divisiondiv").show();
						}	
						if(typeid=='I'){
							console.log('I');
							$("#divisiondiv").hide();
							$("#projectdiv").hide();
							$("#initiationdiv").show();
						}	
					}
					
													
				</script>
					
			
		

	
<script type='text/javascript'> 
function submitForm(frmid)
{ 
  document.getElementById(frmid).submit(); 
} 
$('.items').select2();



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
</script>


</body>
</html>