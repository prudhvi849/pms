	<%@page import="org.apache.commons.text.StringEscapeUtils"%>
<%@page import="java.text.DecimalFormat"%>
<%@page import="com.vts.pfms.projectclosure.model.ProjectClosure"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.vts.pfms.FormatConverter"%>
<%@page import="com.vts.pfms.projectclosure.model.ProjectClosureCheckList"%>
<%@page import="java.util.Arrays"%>
<%@page import="java.util.List"%>
<%@page import="com.vts.pfms.project.model.ProjectMaster"%>
<%@page import="com.vts.pfms.projectclosure.model.ProjectClosureCheckListRev"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<jsp:include page="../static/header.jsp"></jsp:include>
<spring:url value="/resources/css/projectdetails.css" var="projetdetailscss" />
<spring:url value="/resources/ckeditor/ckeditor.js" var="ckeditor" />
<spring:url value="/resources/ckeditor/contents.css" var="contentCss" />

<spring:url value="/resources/css/projectModule/checklist.css" var="checklistCss"/>
<link rel="stylesheet" type="text/css" href="${checklistCss}">

<script src="${ckeditor}"></script>
<link href="${contentCss}" rel="stylesheet" />
<link href="${projetdetailscss}" rel="stylesheet" />

</head>
<body>

<%

ProjectMaster projectMaster = (ProjectMaster)request.getAttribute("ProjectDetails");
ProjectClosure closure = (ProjectClosure)request.getAttribute("ProjectClosureDetails");
ProjectClosureCheckList chlist = (ProjectClosureCheckList)request.getAttribute("ProjectClosureCheckListData");

Object[] potherdetails = (Object[])request.getAttribute("ProjectOriginalRevDetails");
Object[] expndDetails = (Object[])request.getAttribute("ProjectExpenditureDetails");



List<Object[]> labList = (List<Object[]>)request.getAttribute("LabList");

String chlistTabId = (String)request.getAttribute("chlistTabId");
String checklistId = (String)request.getAttribute("checklistId");
String closureId=(String)request.getAttribute("closureId");
String isApproval = (String)request.getAttribute("isApproval");

List<String> chlistforward = Arrays.asList("SIN","SRG","SRA","SRP","SRD","SRC","SRV");

List<String> closurecategory = Arrays.asList("Completed Successfully","Partial Success","Stage Closure","Cancellation");
List<String> dmcdirection = Arrays.asList("Recommended","Not Recommended","Not Applicable");

Object[] Director = (Object[])request.getAttribute("Director");
Object[] GDDPandC = (Object[])request.getAttribute("GDDPandC");
Object[] AD = (Object[])request.getAttribute("AD");
Object[] GD = (Object[])request.getAttribute("GDDetails");
Object[] PDData = (Object[])request.getAttribute("PDData");
Object[] emp = (Object[])request.getAttribute("EmpData");


String labcode = (String)session.getAttribute("labcode");

FormatConverter fc = new FormatConverter();
SimpleDateFormat sdtf = fc.getSqlDateAndTimeFormat();
SimpleDateFormat sdf = fc.getSqlDateFormat();
SimpleDateFormat rdf = fc.getRegularDateFormat();

DecimalFormat df = new DecimalFormat("#.##");
df.setMinimumFractionDigits(2); 
String statuscode = closure!=null?closure.getClosureStatusCode():null;


List<Object[]> Rev = (List<Object[]>)request.getAttribute("ProjectClosureCheckListRev");

%>

<% 
    String ses = (String) request.getParameter("result");
    String ses1 = (String) request.getParameter("resultfail");
    if (ses1 != null) { %>
    <div align="center">
        <div class="alert alert-danger" role="alert">
            <%=StringEscapeUtils.escapeHtml4(ses1) %>
        </div>
    </div>
<% }if (ses != null) { %>
    <div align="center">
        <div class="alert alert-success" role="alert">
            <%=StringEscapeUtils.escapeHtml4(ses) %>
        </div>
    </div>
<% } %>

<div class="container-fluid">
	<div class="row">
   		<div class="col-md-12">
       		<div class="card slider">
       			<!-- This is for Slider Headers -->
         		<div class="card-header slider_header fs12">
             		<h4 class="category">Project Closure Check List - <%if(projectMaster!=null) {%><%=projectMaster.getProjectShortName()!=null?StringEscapeUtils.escapeHtml4(projectMaster.getProjectShortName()): " - "%> (<%=projectMaster.getProjectCode()!=null?StringEscapeUtils.escapeHtml4(projectMaster.getProjectCode()): " - "%>) <%} %>

             			<a class="btn btn-info btn-sm  shadow-nohover back back-btn"
             				<%if(isApproval!=null && isApproval.equalsIgnoreCase("Y") ) {%>
               					href="ProjectClosureApprovals.htm"
               				<%} else if(isApproval!=null &&  isApproval.equalsIgnoreCase("N") ) {%>
               					href="ProjectClosureApprovals.htm?val=app"
               				<%} else{%> 
               					href="ProjectClosureList.htm"
               				<%} %>
             		
             			  >Back</a>
             		</h4>
             		<hr class="margin-8px">
             	
         		</div>
         		
         		<!-- This is for Tab Panes -->
         		<div class="card">
         			<div class="tab-content text-left mt02rem">
         				<!-- *********** checklist Details ***********      --> 
               			<%if(chlistTabId!=null && chlistTabId.equalsIgnoreCase("1")){ %> 
         					<div class="tab-pane active" id="chlistdetails" role="tabpanel">
         				<%}else{ %>
              				<div class="tab-pane " id="chlistdetails" role="tabpanel">
               			<%} %>
               					<div class="container">
									<div class="row width140-ml15-mt1">
										<div class="col-md-12">
											<div class="card shadow-nohover" >
											
											<form>
												<div class="card-header bgcolor-taleft">
								                    <b class="text-white" >Check List Details : 
								                    <% if(chlist!=null) {%>
								                    <button type="submit" class="btn btn-sm"  name="closureId" formmethod="get" formnovalidate="formnovalidate"
                  					 		  				 	value="<%=closureId %>" formaction="ProjectClosureCheckListDownload.htm" formtarget="_blank" data-toggle="tooltip" data-placement="top" title="CheckList Download">
                  					 							<i class="fa fa-download fa-lg"></i>
                  					 						</button>
                  					 							<%} %>
                  					 						</b> 
								                    <hr>
								                    <span class="text-white float-right-fw600"> </span>
							        			</div> 
							        	</form>	
							        
							        <% int count=0; %>
							        		
												<div class="card-body overflow-auto">
								        		
								        <form action="ProjectClosureCheckListDetailsSubmit.htm" method="POST" enctype="multipart/form-data" id="firstpagesubmit">		
								        		<div class="" id="firstpage" >
													
														<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
												    	<input type="hidden" name="closureId" value="<%=closureId%>">
												    	
												     	
												    	 <div class="col-md-3" >
												        		<div class="form-group">
												                	<label class="control-label black-color"><%=++count %>. Project Appraisal Letter (PAR)</label>
												                    
												                </div>
												            </div>
												            
												    	<br>
												    	<br>
												    	
												    	<div class="row ml2-mr2">
												    		
												        	<div class="col-md-2" >
												        		<div class="form-group">
												        		<input type="checkbox" id="hqrssenddate" <%if(chlist!=null && chlist.getQARHQrsSentDate()!=null && !chlist.getQARHQrsSentDate().toString().equalsIgnoreCase("NA")) {%> checked <%} %> >
												                	<label class="control-label">Sent by the Lab to HQrs :</label><span class="mandatory">*</span>
												                    <input  class="form-control" type="text" name="QARHQrsSentDate" id="HQrsSentDate" readonly="readonly"
												                     value="<%if(chlist!=null && chlist.getQARHQrsSentDate()!=null && !chlist.getQARHQrsSentDate().toString().equalsIgnoreCase("NA")){%><%=fc.SqlToRegularDate(chlist.getQARHQrsSentDate())%><%} %>" > 
												                </div>
												            </div>
												            
												            <div class="col-md-2" >
												        		<div class="form-group">
												        		<input type="checkbox" id="CFASend" <%if(chlist!=null && chlist.getQARSentDate()!=null && !chlist.getQARSentDate().toString().equalsIgnoreCase("NA")) {%> checked <%} %> >
												                	<label class="control-label">When sent to the CFA :</label>
												                	 <input  class="form-control" type="text" name="QARSentDate" id="CFASendDate"  readonly="readonly"
												                     value="<%if(chlist!=null && chlist.getQARSentDate()!=null && !chlist.getQARHQrsSentDate().toString().equalsIgnoreCase("NA")){%><%=fc.SqlToRegularDate(chlist.getQARSentDate()) %><%} %>" > 
												                    
												                </div>
												            </div>
												            
												            <div class="col-md-4" >
												        		<div class="form-group">
												                	<label class="control-label">Objective  of the  Project mentioned in the PAR :</label><span class="mandatory">*</span>
												                	 <input  class="form-control form-control" type="text" name="QARObjective" placeholder="Enter Objective  of the  Project mentioned in the PAR" 
												                     value="<%if(chlist!=null && chlist.getQARObjective()!=null) {%><%=StringEscapeUtils.escapeHtml4(chlist.getQARObjective()) %><%} %>" maxlength=3000 > 
												                   
												                </div>
												            </div>
												            
												            
												            
												            <div class="col-md-3" >
												        		<div class="form-group">
												                	<label class="control-label">Milestones :</label><span class="mandatory">*</span>
												                	<%if(chlist!=null && chlist.getQARMilestone()!=null){ %>
                            					 						<button type="submit" class="btn btn-sm padding5px8px" name="filename" formmethod="post" formnovalidate="formnovalidate"
                            					 		  				 	value="QARMilestonefile" formaction="ProjectClosureChecklistFileDownload.htm" formtarget="_blank" data-toggle="tooltip" data-placement="top" title="QARMilestone Download">
                            					 							<i class="fa fa-download fa-lg"></i>
                            					 						</button>
                            					 					<%} %>
                              		      							<input type="file" class="form-control modals" name="QARMilestone" <%-- <%if(chlist==null) {%>required<%} %>  --%> accept=".pdf">
												                </div>
												            </div>
												            
												        </div>
												        
												        
												   <div class="row ml2-mr2">
												        
												        
												        <div class="col-md-2" >
												        		<div class="form-group">
												                	<label class="control-label">PDC</label><span class="mandatory">*</span>
												                    <input  class="form-control " type="text" name="QARPDCDate" id="PDCDate"
												                     value="<%if(chlist!=null && chlist.getQARPDCDate()!=null) {%><%=fc.SqlToRegularDate(chlist.getQARPDCDate()) %><%} %>" > 
												                </div>
												            </div>
												            
												           <div class="col-md-2" >
												        		<div class="form-group">
												                	<label class="control-label">Proposed Cost (in rupees)</label><span class="mandatory">*</span>
												                    <input  class="form-control " type="number" min="0" name="QARProposedCost"  maxlength="15" step="0.01"
												                     value="<%if(chlist!=null && chlist.getQARProposedCost()>=0) {%><%=chlist.getQARProposedCost() %><%} else{ %> 0 <%} %>" > 
												                </div>
												            </div> 
												            
												            
												            <div class="col-md-3" >
												        		<div class="form-group">
												                	<label class="control-label">Cost Break-up (Activity wise, Period wise) </label><span class="mandatory">*</span>
												                   <%if(chlist!=null && chlist.getQARCostBreakup()!=null){ %>
                            					 						<button type="submit" class="btn btn-sm padding5px8px" name="filename" formmethod="post" formnovalidate="formnovalidate"
                            					 		  				 	value="QARCostBreakupfile" formaction="ProjectClosureChecklistFileDownload.htm" formtarget="_blank" data-toggle="tooltip" data-placement="top" title="Monitoring Committee Recommendations Download">
                            					 							<i class="fa fa-download fa-lg"></i>
                            					 						</button>
                            					 					<%} %>
                              		      							<input type="file" class="form-control modals" name="QARCostBreakup" <%-- <%if(chlist==null) {%>required<%} %> --%> accept=".pdf">
												                   
												                </div>
												            </div>
												            
												            <div class="col-md-5" >
												        		<div class="form-group">
												                	<label class="control-label">List of non-consumable items required (at least costing more than Rs.10 lacs) </label><span class="mandatory">*</span>
												                   <%if(chlist!=null && chlist.getQARNCItems()!=null){ %>
                            					 						<button type="submit" class="btn btn-sm padding5px8px" name="filename" formmethod="post" formnovalidate="formnovalidate"
                            					 		  				 	value="QARNCItemsfile" formaction="ProjectClosureChecklistFileDownload.htm" formtarget="_blank" data-toggle="tooltip" data-placement="top" title="Monitoring Committee Recommendations Download">
                            					 							<i class="fa fa-download fa-lg"></i>
                            					 						</button>
                            					 					<%} %>
                              		      							<input type="file" class="form-control modals" name="QARNCItems" <%-- <%if(chlist==null) {%>required<%} %> --%> accept=".pdf">
												                   
												                </div>
												            </div>
												            
												     </div>
												        
												    <hr>
												        
												       <div class="col-md-3" >
												        		<div class="form-group">
												                	<label class="control-label black-color"><%=++count %>. Revision in sanctioned cost if any &nbsp;
												                	<input type="checkbox" id="RevSancCost" name="RevSancCost" 
												                	<%if (Rev!=null && Rev.size()>0){
												                		for(Object[] obj : Rev) { 
																	    if(obj[1]!=null && obj[1].toString().equalsIgnoreCase("SANC")){ %> checked <%}}} %> ></label>
												                    
												                </div>
												            </div>
												         <br>
												         <br>  
												     
												          
												        <div class="row ml2-mr2" id="selectRevSancCost">       
									                  <table class="width94-ml3" id="tablesancrev">
															<thead class="table-bgcolor">
																<tr>
																    <th class="label-1">When requested</th>
															    	<th class="label-1">When granted</th>
															    	<th class="label-1">Revised cost (in rupees)</th>
															    	<th class="label-2">Any reason specified</th>
																    <td class="width-5per">
																		<button type="button" class="btn btn_add_sancrev"> <i class="btn btn-sm fa fa-plus green-color"></i></button>
																	</td>
																</tr>
															</thead>
															
															 <tbody>
															  <% int a=0;if(Rev !=null && Rev.size()>0) {
																  for(Object[] obj : Rev) {
																	  if(obj[1]!=null && obj[1].toString().equalsIgnoreCase("SANC")){ a=1;%>
																
																<tr class="tr_clone_trialresults">
																	<td class="label-3">
																	    <input type="text" class="form-control item" name="SCRequested" value="<%=fc.SqlToRegularDate(obj[2].toString())%>" id="SCRequested">
																	</td>	
																	
																	<td class="label-3">
																	     <input type="text" class="form-control item" name="SCGranted"  value="<%=fc.SqlToRegularDate(obj[3].toString())%>" id="SCGranted">
																	</td>
																	
																	<td class="label-3">
																		<input type="number" class="form-control item" name="SCRevisionCost"  value="<%=df.format(Double.parseDouble(obj[4].toString()))%>" >
																	</td>
																	
																	<td class="label-4">
																	
																	    <input type="text" class="form-control item" name="SCReason"  value="<%= obj[6] != null ? StringEscapeUtils.escapeHtml4(obj[6].toString()) : "" %>" placeholder="Enter Reason">
																	    
																	</td>
																		
																		
																	<td class="width-5per">
																		 <button type="button" class="btn btn_rem_sancrev" ><i class="btn btn-sm fa fa-minus"></i></button>
																	</td>									
																</tr>
																
																<%}}}%>
																
																<%if(a==0){ %>
																<tr class="tr_clone_trialresults">
																	<td class="label-3">
																	    <input type="text" class="form-control item" name="SCRequested" value="" id="SCRequested">
																	</td>	
																	
																	<td class="label-3">
																	     <input type="text" class="form-control item" name="SCGranted"  value="" id="SCGranted">
																	</td>
																	
																	<td class="label-3">
																		<input type="number" class="form-control item" name="SCRevisionCost"  value="0" >
																	</td>
																	
																	<td class="label-4">
																	
																	    <input type="text" class="form-control item" name="SCReason"  value="" placeholder="Enter Reason">
																	    
																	</td>
																		
																		
																	<td class="width-5per">
																		 <button type="button" class="btn btn_rem_sancrev" ><i class="btn btn-sm fa fa-minus red-color"></i></button>
																	</td>									
																</tr>
																<%} %>
															
													          </tbody>
									                       </table> 
									                       </div>
											               				          
														   <br>				          
												           <hr>
												          
												          
												           <div class="col-md-3" >
												        		<div class="form-group">
												                	<label class="control-label black-color"><%=++count %>. Revision in PDC if any &nbsp;<input type="checkbox" id="RevPDCCost" name="RevPDCCost"
												                 <%if (Rev!=null && Rev.size()>0 ) {
												                	 for(Object[] obj : Rev) { 
																	 if(obj[1]!=null && obj[1].toString().equalsIgnoreCase("PDC")){ %> checked <%}}} %> ></label>
												                 
												                    
												                </div>
												            </div>
												           
												         <br>
												         <br>   
												            
												        <div class="row ml2-mr2" id="selectRevPDCCost">      
												           <table class="width94-ml3" id="tablepdcrev">
															<thead class="bgcolor-white-tacenter">
																<tr>
																    <th class="label-1">When requested</th>
															    	<th class="label-1">When granted</th>
															    	<th class="label-1">Quantum/Revised PDC</th>
															    	<th class="label-2">Any reason specified</th>
																    <td class="width-5per">
																		<button type="button" class="btn btn_add_pdcrev"> <i class="btn btn-sm fa fa-plus green-color"></i></button>
																	</td>
																</tr>
															</thead>
															
															 <tbody>
															  <% int b=0;if(Rev !=null && Rev.size()>0) {
																  for(Object[] obj : Rev) { 
																        if(obj[1]!=null && obj[1].toString().equalsIgnoreCase("PDC")){ b=1;%>
																        
																<tr class="tr_clone_results">
																	<td class="label-3" >
																	    <input type="text" class="form-control item" name="PDCRequested" value="<%=fc.SqlToRegularDate(obj[2].toString())%>" id="PDCRequested">
																	</td>	
																	
																	<td class="label-3" >
																	     <input type="text" class="form-control item" name="PDCGranted"  value="<%=fc.SqlToRegularDate(obj[3].toString())%>" id="PDCGranted">
																	</td>
																	
																	<td class="label-3">
																		<input type="text" class="form-control item" name="PDCRevised"  value="<%=fc.SqlToRegularDate(obj[5].toString())%>"  id="PDCRevised">
																	</td>
																	
																	<td class="label-4" >
																	
																	    <input type="text" class="form-control item" name="PDCReason"  value="<%=obj[6] != null ? StringEscapeUtils.escapeHtml4(obj[6].toString()) : "" %>" placeholder="Enter Reason">
																	    
																	</td>
																		
																		
																	<td class="width-5per">
																		 <button type="button" class="btn btn_rem_pdcrev" ><i class="btn btn-sm fa fa-minus red-color"></i></button>
																	</td>									
																</tr>
																
																<%}}}%>
																
																<%if(b==0){ %>
																<tr class="tr_clone_results">
																	<td class="label-3" >
																	    <input type="text" class="form-control item" name="PDCRequested" id="PDCRequested">
																	</td>	
																	
																	<td class="label-3" >
																	     <input type="text" class="form-control item" name="PDCGranted" id="PDCGranted">
																	</td>
																	
																	<td class="label-3">
																		<input type="text" class="form-control item" name="PDCRevised" id="PDCRevised">
																	</td>
																	
																	<td class="label-4" >
																	
																	    <input type="text" class="form-control item" name="PDCReason" placeholder="Enter Reason">
																	    
																	</td>
																		
																		
																	<td class="width-5per">
																		 <button type="button" class="btn btn_rem_pdcrev" ><i class="btn btn-sm fa fa-minus red-color"></i></button>
																	</td>									
																</tr>
																
																<%} %>
															
															  </tbody>
											               </table>
											               </div>
											               
											               <br>
												           
												        <hr>
												          
												          
												      <div class="col-md-3" >
												        		<div class="form-group">
												                	<label class="control-label black-color"><%=++count %>. Project Register</label>
												                    
												                </div>
												            </div>
												           
												         <br>
												              
												          
												     <div class="row ml2-mr2">         
												          <div class="col-md-3" >
												        		<div class="form-group">
												                	<label class="control-label">Maintained in proper format</label><span class="mandatory">*</span>
<%-- 												                   
 --%>												                   
                                                                         <select class="form-control w-50" data-width="100%" data-live-search="true" name="PRMaintained">
                                                                            <option value="0" selected disabled >--Select--</option>
                                                                            <option value="Yes" <% if(chlist!=null &&  chlist.getPRMaintained() !=null && chlist.getPRMaintained().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                            <option  value="No" <% if(chlist!=null &&  chlist.getPRMaintained() !=null && chlist.getPRMaintained().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                            <option  value="N/A" <% if(chlist!=null &&  chlist.getPRMaintained() !=null && chlist.getPRMaintained().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                            
                                                                         
                                                                         </select>
												                </div>
												            </div> 
												            
												            <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Remarks</label>
												                   
                              		      							<textarea class="form-control form-control fs15px" name="PRRemark1" maxlength="255" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getPRRemark1()!=null) {%><%=chlist.getPRRemark1() %><%} %></textarea> 
                              		      							
												                </div>
												              </div>
												            
												            
												            
												              <div class="col-md-4" >
												        		<div class="form-group">
												                	<label class="control-label">Sanctioned projects entered (including sub-projects)</label><span class="mandatory">*</span>
											                    
												                    <select class="form-control w-50" data-width="100%" data-live-search="true" name="PRSanctioned">
                                                                            <option value="0" selected disabled >--Select--</option>
                                                                            <option value="Yes" <% if(chlist!=null &&  chlist.getPRSanctioned() !=null && chlist.getPRSanctioned().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                            <option  value="No" <% if(chlist!=null &&  chlist.getPRSanctioned() !=null && chlist.getPRSanctioned().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                            <option  value="N/A" <% if(chlist!=null &&  chlist.getPRSanctioned() !=null && chlist.getPRSanctioned().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                   </select>
												                    
												                    
												                </div>
												            </div> 
												            
												            
												              <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Remarks</label>
												                   
                              		      							<textarea class="form-control form-control fs15px" name="PRRemark2" maxlength="255" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getPRRemark2()!=null) {%><%=chlist.getPRRemark2() %><%} %></textarea> 
                              		      							
												                </div>
												              </div>
												         </div>     
												  <hr>
												       
												    <div class="col-md-3" >
												        		<div class="form-group">
												                	<label class="control-label black-color"><%=++count %>. Project expenditure Card</label>
												                 </div>
												            </div>
												           
												         <br> 
												      
												       <div class="row ml2-mr2"> 
												               
												          <div class="col-md-5" >
												        		<div class="form-group">
												                	<label class="control-label">Expenditure verified by Project Director/ In-charge</label><span class="mandatory">*</span>
											                    
                                                                     <select class="form-control w-50" data-width="100%" data-live-search="true" name="PECVerified">
	                                                                            <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getPECVerified() !=null && chlist.getPECVerified().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getPECVerified() !=null && chlist.getPECVerified().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getPECVerified() !=null && chlist.getPECVerified().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
						                                          </div>
												            </div> 
												            
												            <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Remarks</label>
												                   
                              		      							<textarea class="form-control form-control fs15px" name="PECRemark1" maxlength="255" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getPECRemark1()!=null) {%><%=chlist.getPECRemark1() %><%} %></textarea> 
                              		      							
												                </div>
												              </div>
												            
												        </div> 
												        
												         <div class="checklistpage text-center">
												        
												        <% if(chlist!=null && chlist.getQARObjective()!=null) { %>
												        
            							                         <button class="btn-warning edit btn" type="submit" id="firstpagechange" name="Action" value="Edit" onclick="return confirm('Are You Sure To Update')">UPDATE</button>
            							                    
            							                    
            							                    <%}else{ %>
            							                    
            							                        <button class="btn btn-info btn-sm success submit" type="submit" id="firstpagechange" name="Action" value="Add" onclick="return confirm('Are You Sure To Submit')">SUBMIT</button>
            							                        
            							                    
            							                    <%} %>
														</div> 
											<!-- </form> --> 
											   
											   <br>
												   
												   <div class="pagin pagination-display"> 
																
																	
																	<div class="pagination">
																			
																			<div class="page-item">
																				<button class="page-link" type="button" id="firstpage1" >1</button>
																			</div>
																			
																			
																			<div class="page-item">
																				<button class="page-link" type="button" id="firstpage2" >2</button>
																			</div>
																			
																			<div class="page-item">
																				<button class="page-link" type="button" id="firstpage3" >3</button>
																			</div>
																		
																		</div>
																 </div>  
												    
												    </div>	
												    
												    
												    
											  <div class="" id="secondpage">	    
														<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
												    	<input type="hidden" name="closureId" value="<%=closureId%>">
												   
												         
												          <div class="col-md-3" >
												        		<div class="form-group">
												                	<label class="control-label black-color"><%=++count %>. Commitment register</label>
												                    
												                </div>
												            </div> 
												  
												         <br>
												  
												     <div class="row ml2-mr2">         
												          <div class="col-md-4" >
												        		<div class="form-group">
												                	<label class="control-label">Bring From</label><span class="mandatory">*</span>
												                	
												                     <select class="form-control w-50" data-width="100%" data-live-search="true" name="CRBringFrom" id="select3">
	                                                                            <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="IBAS" <% if(chlist!=null && chlist.getCRBringFrom()!=null && chlist.getCRBringFrom().equalsIgnoreCase("IBAS")) {%> selected <%} %> >IBAS</option>
                                                                                 <option  value="DOC" <% if(chlist!=null && chlist.getCRBringFrom()!=null && chlist.getCRBringFrom().equalsIgnoreCase("DOC")) {%> selected <%} %> >Add Document</option>
                                                                       </select>
                                                                     </div>
												            </div> 
												            
												            
												             <div class="col-md-5" id="CRUpload">
												        		<div class="form-group">
												                	<label class="control-label">Upload :</label><span class="mandatory">*</span>
												                	
                            					 						<%if(chlist!=null && chlist.getCommittmentRegister()!=null){ %>
                            					 						<button type="submit" class="btn btn-sm padding5px8px" name="filename" formmethod="post" formnovalidate="formnovalidate"
                            					 		  				 	value="CommittmentRegisterfile" formaction="ProjectClosureChecklistFileDownload.htm" formtarget="_blank" data-toggle="tooltip" data-placement="top" title="CommittmentRegister Download">
                            					 							<i class="fa fa-download fa-lg"></i>
                            					 						</button>
                            					 					<%} %>
                            					 					
                              		      							<input type="file" class="form-control modals" name="CommittmentRegister"  accept=".pdf">
												                </div>
												            </div>
												            
												         </div>
												  
												         <hr> 
												         
												            <div class="col-md-3" >
												        		<div class="form-group">
												                	<label class="control-label black-color"><%=++count %>. Subsidiary register</label>
												                    
												                </div>
												            </div> 
												            
												            <br>
												          
												        <div class="row ml2-mr2">         
												          <div class="col-md-2" >
												        		<div class="form-group">
												                	<label class="control-label">Maintained Properly</label><span class="mandatory">*</span>
												                    
                                                                         <select class="form-control w-50" data-width="100%" data-live-search="true" name="SRMaintained">
	                                                                            <option value="0" selected disabled >Select</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getSRMaintained() !=null && chlist.getSRMaintained().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getSRMaintained() !=null && chlist.getSRMaintained().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getSRMaintained() !=null && chlist.getSRMaintained().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                    </div>
												            </div> 
												            
												               <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Remarks</label>
												                   
                              		      							<textarea class="form-control form-control fs15px" name="SRRemark1" maxlength="255" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getSRRemark1()!=null) {%><%=chlist.getSRRemark1() %><%} %></textarea> 
                              		      							
												                </div>
												              </div>
												         </div>
												        
												        <hr>
												        
												        
												        <div class="col-md-4" >
												        		<div class="form-group">
												                	<label class="control-label black-color"><%=++count %>. Procurement/ Accounting Procedure (consumable Stores)</label>
												                    
												                </div>
												            </div> 
												        <br>
												        <br>
												        
												      <div class="row ml2-mr2">         
												          <div class="col-md-2" >
												        		<div class="form-group">
												                	<label class="control-label">Procedure followed </label><span class="mandatory">*</span>
												                    <select name="CSProcedure"  class="form-control" data-width="100%" data-live-search="true"  id="select1" required>
			                											<option value="0" disabled="disabled" selected="selected">--Select--</option>
												               			
												               			<option value="PurchasedDirectly" <%if(chlist!=null && chlist.getCSProcedure()!=null && chlist.getCSProcedure().equalsIgnoreCase("PurchasedDirectly")){ %> selected <%} %> >Purchased Directly </option>
												               			<option value="ThroughMainStream"  <%if(chlist!=null && chlist.getCSProcedure()!=null && chlist.getCSProcedure().equalsIgnoreCase("ThroughMainStream")){ %> selected <%} %> >Through Main Stream </option>
												               			
																	</select>
												                    
												                </div>
												              </div> 
												               
												               <div class="col-md-6"  id="CSDrawn" >
												                 <div class="form-group">
												                	<label class="control-label">If through main stores, drawn from main Stock Register through Demand-cum-issue voucher </label><span class="mandatory">*</span>
												                     <select class="form-control w-50" data-width="100%" data-live-search="true" name="CSDrawn">
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getCSDrawn() !=null && chlist.getCSDrawn().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getCSDrawn() !=null && chlist.getCSDrawn().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getCSDrawn() !=null && chlist.getCSDrawn().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                    
												                    
												                </div>
												              </div>
												              
												              
												              <div class="col-md-3"  id="CSReason">
												                 <div class="form-group">
												                	<label class="control-label">If not through main stores, reason thereof </label><span class="mandatory">*</span>
												                    <textarea class="form-control form-control fs15px" name="CSReason" maxlength="3000" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getCSReason()!=null) {%><%=chlist.getCSReason() %><%} %></textarea> 
												                    
												                </div>
												              </div>
												               
												                
												               <div class="col-md-3" >
												                 <div class="form-group">
												                	<label class="control-label">Amount is debited to Project Expenditure card </label><span class="mandatory">*</span>
												                    
												                    <select class="form-control w-50" data-width="100%" data-live-search="true" name="CSamountdebited">
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getCSamountdebited() !=null && chlist.getCSamountdebited().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getCSamountdebited() !=null && chlist.getCSamountdebited().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getCSamountdebited() !=null && chlist.getCSamountdebited().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                    
												                    
												                </div>
												              </div>
												              
												             <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Remarks</label>
												                   
                              		      							<textarea class="form-control form-control fs15px" name="CSRemark1" maxlength="255" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getCSRemark1()!=null) {%><%=chlist.getCSRemark1() %><%} %></textarea> 
                              		      							
												                </div>
												              </div>
												              
												                 
												        </div>
												        
												        <hr>
												        
												        
												       <div class="col-md-4" >
												        		<div class="form-group">
												                	<label class="control-label black-color"><%=++count %>. Procurement/ Accounting Procedure (Non-consumable Stores)</label>
												                    
												                </div>
												        </div> 
												            
												        <br>
												        <br> 
												        
												        <div class="row ml2-mr2">         
												          <div class="col-md-2" >
												        		<div class="form-group">
												                	<label class="control-label">Procedure followed </label><span class="mandatory">*</span>
												                    <select name="NCSProcedure" id="select2" class="form-control" data-width="100%" data-live-search="true" required>
			                											<option value="0" disabled="disabled" selected="selected">--Select--</option>
												               			
												               			<option value="PurchasedDirectly" <%if(chlist!=null && chlist.getNCSProcedure()!=null && chlist.getNCSProcedure().equalsIgnoreCase("PurchasedDirectly")){ %> selected <%} %> >Purchased Directly </option>
												               			<option value="ThroughMainStream" <%if(chlist!=null && chlist.getNCSProcedure()!=null && chlist.getNCSProcedure().equalsIgnoreCase("ThroughMainStream")){ %> selected <%} %> >Through Main Stream </option>
												               			
																	</select>
												                    
												                </div>
												              </div> 
												              
												              <div class="col-md-6"  id="NCSDrawn" >
												                 <div class="form-group">
												                	<label class="control-label">If through main stores, drawn from main Stock Register through Demand-cum-issue voucher </label><span class="mandatory">*</span>												                    
												                     <select class="form-control w-50" data-width="100%" data-live-search="true" name="NCSDrawn">
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getNCSDrawn() !=null && chlist.getNCSDrawn().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getNCSDrawn() !=null && chlist.getNCSDrawn().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getNCSDrawn() !=null && chlist.getNCSDrawn().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                    
												                </div>
												              </div>
												              
												              
												              <div class="col-md-3"  id="NCSReason">
												                 <div class="form-group">
												                	<label class="control-label">If not through main stores, reason thereof </label><span class="mandatory">*</span>
												                    <textarea class="form-control form-control fs15px" name="NCSReason" maxlength="3000" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getNCSReason()!=null) {%><%=chlist.getNCSReason() %><%} %></textarea> 
												                    
												                </div>
												              </div>
												              
												               
												                
												               <div class="col-md-3" >
												                 <div class="form-group">
												                	<label class="control-label">Amount is debited to Project Expenditure card </label><span class="mandatory">*</span>
												                    
												                     <select class="form-control w-50" data-width="100%" data-live-search="true" name="NCSamountdebited">
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getNCSamountdebited() !=null && chlist.getNCSamountdebited().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getNCSamountdebited() !=null && chlist.getNCSamountdebited().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getNCSamountdebited() !=null && chlist.getNCSamountdebited().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                    
												                </div>
												              </div>
												              
												              
												              <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Remarks</label>
												                   
                              		      							<textarea class="form-control form-control fs15px" name="NCSRemark1" maxlength="255" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getNCSRemark1()!=null) {%><%=chlist.getNCSRemark1() %><%} %></textarea> 
                              		      							
												                </div>
												              </div>
												              
												                   
												        </div>
												        
												        
												        <div class="row ml2-mr2">         
												         
													         <div class="col-md-9" >
													                 <div class="form-group">
													                	<label class="control-label">In main stores ledger, item shown as distributed to Project Inventory of non-consumables being maintained in project group </label><span class="mandatory">*</span>
													                    
													                    <select class="form-control w-50" data-width="100%" data-live-search="true" name="NCSDistributed">
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getNCSDistributed() !=null && chlist.getNCSDistributed().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getNCSDistributed() !=null && chlist.getNCSDistributed().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getNCSDistributed() !=null && chlist.getNCSDistributed().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                    
													                    
													                </div>
													          </div>
													          
													          
													          <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Remarks</label>
												                   
                              		      							<textarea class="form-control form-control fs15px" name="NCSRemark2" maxlength="255" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getNCSRemark2()!=null) {%><%=chlist.getNCSRemark2() %><%} %></textarea> 
                              		      							
												                </div>
												              </div>
													          
													          
													          
													           <div class="col-md-9" >
													                 <div class="form-group">
													                	<label class="control-label">Any non-consumable item incorporated in any prototype stores are received and SIR is prepared before closure of project </label><span class="mandatory">*</span>
													                    
													                    <select class="form-control w-50" data-width="100%" data-live-search="true" name="NCSIncorporated">
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getNCSIncorporated() !=null && chlist.getNCSIncorporated().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getNCSIncorporated() !=null && chlist.getNCSIncorporated().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getNCSIncorporated() !=null && chlist.getNCSIncorporated().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
													                    
													                    
													                    
													                </div>
													          </div>
													          
													          
													          <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Remarks</label>
												                   
                              		      							<textarea class="form-control form-control fs15px" name="NCSRemark3" maxlength="255" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getNCSRemark3()!=null) {%><%=chlist.getNCSRemark3() %><%} %></textarea> 
                              		      							
												                </div>
												              </div>
												              
												        </div>
												        
												        <hr>
												        
												       <div class="col-md-4" >
												        		<div class="form-group">
												                	<label class="control-label black-color"><%=++count %>. Equipment</label>
												                </div>
												        </div> 
												            
												        <br>
												        <br>
												        
												        
												        
												        <div class="row ml2-mr2">         
												          <div class="col-md-4" >
												        		<div class="form-group">
												                	<label class="control-label">List out major non-consumable/ equipment procured</label><span class="mandatory">*</span>
												                     <%if(chlist!=null && chlist.getEquipProcured()!=null){ %>
                            					 						<button type="submit" class="btn btn-sm padding5px8px" name="filename" formmethod="post" formnovalidate="formnovalidate"
                            					 		  				 	value="EquipProcuredfile" formaction="ProjectClosureChecklistFileDownload.htm" formtarget="_blank" data-toggle="tooltip" data-placement="top" title="Equipment Procured Download">
                            					 							<i class="fa fa-download fa-lg"></i>
                            					 						</button>
                            					 					<%} %>
                              		      							<input type="file" class="form-control modals" name="EquipProcuredAttach"  <%-- <%if(chlist==null) {%>required<%} %> --%>  accept=".pdf">
												                    
												                </div>
												              </div> 
												               
												                
												               <div class="col-md-5" >
												                 <div class="form-group">
												                	<label class="control-label">Any major equipment not listed in Q.P.R has been purchased? </label><span class="mandatory">*</span>												                    
												                    <select class="form-control w-50" data-width="100%" data-live-search="true" name="EquipPurchased" id="checkbox">
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getEquipPurchased() !=null && chlist.getEquipPurchased().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getEquipPurchased() !=null && chlist.getEquipPurchased().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getEquipPurchased() !=null && chlist.getEquipPurchased().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                    
												                    
												                </div>
												              </div>
												              
												              
												              <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Remarks</label>
												                   
                              		      							<textarea class="form-control form-control fs15px" name="EquipmentRemark1" maxlength="255" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getEquipmentRemark1()!=null) {%><%=chlist.getEquipmentRemark1() %><%} %></textarea> 
                              		      							
												                </div>
												              </div>
												              
												              <div class="col-md-3"  id="EquipReason">
												                 <div class="form-group">
												                	<label class="control-label">If yes, reason assigned </label><span class="mandatory">*</span>
												                     <textarea class="form-control form-control fs15px" name="EquipReason" maxlength="3000" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" > <% if(chlist!=null && chlist.getEquipReason()!=null ) {%><%=chlist.getEquipReason()%><%} %></textarea> 
												                </div>
												              </div>
												              
												                     
												        </div>
												        
												        
												      <div class="row ml2-mr2">         
												         <div class="col-md-7" >
												                 <div class="form-group">
												                	<label class="control-label">Any major equipment procured within one month before the PDC (give details and reason thereof) </label><span class="mandatory">*</span>												                    
												                    <select class="form-control w-50" data-width="100%" data-live-search="true" name="EquipProcuredBeforePDC" id="checkbox1">
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getEquipProcuredBeforePDC() !=null && chlist.getEquipProcuredBeforePDC().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getEquipProcuredBeforePDC() !=null && chlist.getEquipProcuredBeforePDC().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getEquipProcuredBeforePDC() !=null && chlist.getEquipProcuredBeforePDC().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                    
												                    
												                </div>
												              </div>
												              
												               <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Remarks</label>
												                   
                              		      							<textarea class="form-control form-control fs15px" name="EquipmentRemark2" maxlength="255" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getEquipmentRemark2()!=null) {%><%=chlist.getEquipmentRemark2() %><%} %></textarea> 
                              		      							
												                </div>
												              </div>
												              
												              
												              
												              <div class="col-md-3"  id="EquipProcuredBeforePDCAttach">
												                 <div class="form-group">
												                	<label class="control-label">Attach if yes</label><span class="mandatory">*</span>
												                     <%if(chlist!=null && chlist.getEquipProcuredBeforePDCAttach()!=null){ %>
                            					 						<button type="submit" class="btn btn-sm padding5px8px" name="filename" formmethod="post" formnovalidate="formnovalidate"
                            					 		  				 	value="EquipProcuredBeforePDCfile" formaction="ProjectClosureChecklistFileDownload.htm" formtarget="_blank" data-toggle="tooltip" data-placement="top" title="EquipProcuredBeforePDC Download">
                            					 							<i class="fa fa-download fa-lg"></i>
                            					 						</button>
                            					 					<%} %>
                              		      							<input type="file" class="form-control modals" name="EquipProcuredBeforePDCAttach" <%-- <%if(chlist==null) {%>required<%} %> --%> accept=".pdf">
												                </div>
												              </div>
												               
												        </div>
												        
												    <div class="row ml2-mr2">              
												        <div class="col-md-8" >
												                 <div class="form-group">
												                	<label class="control-label">Any equipment bought on charge within one month before the PDC or after PDC (Give details and reasons thereof) </label><span class="mandatory">*</span>												                    
												                     <select class="form-control w-50" data-width="100%" data-live-search="true" name="EquipBoughtOnCharge" id="checkbox2">
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getEquipBoughtOnCharge() !=null && chlist.getEquipBoughtOnCharge().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getEquipBoughtOnCharge() !=null && chlist.getEquipBoughtOnCharge().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getEquipBoughtOnCharge() !=null && chlist.getEquipBoughtOnCharge().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                    
												                    
												                </div>
												              </div>
												              
												              
												               <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Remarks</label>
												                   
                              		      							<textarea class="form-control form-control fs15px" name="EquipmentRemark3" maxlength="255" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getEquipmentRemark3()!=null) {%><%=chlist.getEquipmentRemark3() %><%} %></textarea> 
                              		      							
												                </div>
												              </div>
												              
												              
												              <div class="col-md-3"  id="EquipBoughtOnChargereason">
												                 <div class="form-group">
												                	<label class="control-label">Reason if yes </label><span class="mandatory">*</span>
												                    <input  class="form-control" name="EquipBoughtOnChargeReason"   value="<% if(chlist!=null && chlist.getEquipBoughtOnChargeReason()!=null) {%><%=StringEscapeUtils.escapeHtml4(chlist.getEquipBoughtOnChargeReason()) %><%}%>" >
												                </div>
												              </div>
												              
												        </div>
												        
												  <hr>
												        
												        
												      <div class="col-md-4" >
												        		<div class="form-group">
												                	   <label class="control-label black-color"><%=++count %>. Budget</label>
												                </div>
												        </div>
												            
												        <br>
												        <br>   
												          
												         <div class="row ml2-mr2">         
												          
												           <div class="col-md-5" >
												                 <div class="form-group">
												                	<label class="control-label">Yearly break up of Allotment & Expenditure since the Project sanctioned </label><span class="mandatory">*</span>
												                    
												                    <select class="form-control w-50" data-width="100%" data-live-search="true" name="BringFrom" id="select4">
	                                                                            <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="IBAS">IBAS</option>
                                                                                 <option  value="DOC">Add Document</option>
                                                                       </select>
												                    
												                </div>
												              </div>
												              
												              <div class="col-md-2" id="BudgetDocUpload">
												        		<div class="form-group">
												                	<label class="control-label">Upload :</label><span class="mandatory">*</span>
												                	<%if(chlist!=null && chlist.getBudgetDocument()!=null){ %>
                            					 						<button type="submit" class="btn btn-sm padding5px8px" name="filename" formmethod="post" formnovalidate="formnovalidate"
                            					 		  				 	value="BudgetDocumentfile" formaction="ProjectClosureChecklistFileDownload.htm" formtarget="_blank" data-toggle="tooltip" data-placement="top" title="BudgetDocument Download">
                            					 							<i class="fa fa-download fa-lg"></i>
                            					 						</button>
                            					 					<%} %>
                            					 					
                              		      							<input type="file" class="form-control modals" name="BudgetDocument"  accept=".pdf">
												                </div>
												            </div>
												          
												          
												          
												          
												               <div class="col-md-7" >
												                 <div class="form-group">
												                	<label class="control-label">The reviewing officer should  see  the allocation  w.r.t demands  and  also  the  projections  in  the Q.P.R </label><span class="mandatory">*</span>
												                    
												                    <select class="form-control w-50" data-width="100%" data-live-search="true" name="BudgetAllocation" >
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getBudgetAllocation() !=null && chlist.getBudgetAllocation().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getBudgetAllocation() !=null && chlist.getBudgetAllocation().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getBudgetAllocation() !=null && chlist.getBudgetAllocation().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                    
												                </div>
												              </div>
												              
												              
												               <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Remarks</label>
												                   
                              		      							<textarea class="form-control form-control fs15px" name="BudgetRemark1" maxlength="255" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getBudgetRemark1()!=null) {%><%=chlist.getBudgetRemark1()%><%} %></textarea> 
                              		      							
												                </div>
												              </div>
												              
												              
												              <div class="col-md-5" >
												                 <div class="form-group">
												                	<label class="control-label">What is the mechanism for monitoring/ control of head-wise expenditure? </label><span class="mandatory">*</span>
												                    <textarea class="form-control form-control fs15px" name="BudgetMechanism" maxlength="3000" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getBudgetMechanism()!=null) {%><%=chlist.getBudgetMechanism() %><%} %></textarea> 
												                    
												                </div>
												              </div>
												              
												              
												              <div class="col-md-5" >
												                 <div class="form-group">
												                	<label class="control-label">Mention, if expenditure under any head exceeded the respective allocation</label><span class="mandatory">*</span>
												                   
                              		      				     <input  class="form-control" name="Budgetexpenditure"   value="<% if(chlist!=null && chlist.getBudgetExpenditure()!=null) {%><%=StringEscapeUtils.escapeHtml4(chlist.getBudgetExpenditure()) %><%}%>" >
                              		      							
                              		      							
												                </div>
												              </div>
												              
												              
												               <div class="col-md-6" >
												                 <div class="form-group">
												                	<label class="control-label">Whether financial progress is in consonance with Tech. progress.</label><span class="mandatory">*</span>
												                    
												                     <select class="form-control w-50" data-width="100%" data-live-search="true" name="BudgetFinancialProgress" >
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getBudgetFinancialProgress() !=null && chlist.getBudgetFinancialProgress().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getBudgetFinancialProgress() !=null && chlist.getBudgetFinancialProgress().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getBudgetFinancialProgress() !=null && chlist.getBudgetFinancialProgress().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                    
												                    
												                </div>
												              </div>
												              
												              
												              <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Remarks</label>
												                   
                              		      							<textarea class="form-control form-control fs15px" name="BudgetRemark2" maxlength="255" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getBudgetRemark2()!=null) {%><%=chlist.getBudgetRemark2() %><%} %></textarea> 
                              		      							
												                </div>
												              </div>
												              
												              
												              
												              
												               <div class="col-md-7" >
												                 <div class="form-group">
												                	<label class="control-label">Monthly/ Quarterly expenditure Reports are rendered to R&D HQrs and copy sent to local CDA</label><span class="mandatory">*</span>
												                    
												                    <select class="form-control w-50" data-width="100%" data-live-search="true" name="BudgetexpenditureReports" >
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getBudgetexpenditureReports() !=null && chlist.getBudgetexpenditureReports().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getBudgetexpenditureReports() !=null && chlist.getBudgetexpenditureReports().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getBudgetexpenditureReports() !=null && chlist.getBudgetexpenditureReports().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                    
												                    
												                </div>
												              </div>
												              
												                 <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Remarks</label>
												                   
                              		      							<textarea class="form-control form-control fs15px" name="BudgetRemark3" maxlength="255" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getBudgetRemark3()!=null) {%><%=chlist.getBudgetRemark3()%><%} %></textarea> 
                              		      							
												                </div>
												              </div>
												              
												              
												               <div class="col-md-5" >
												                 <div class="form-group">
												                	<label class="control-label">Any expenditure incurred after Project PDC (Give details and reasons thereof)</label><span class="mandatory">*</span>
												                    
												                     <select class="form-control w-50" data-width="100%" data-live-search="true" name="BudgetexpenditureIncurred" >
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getBudgetexpenditureIncurred() !=null && chlist.getBudgetexpenditureIncurred().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getBudgetexpenditureIncurred() !=null && chlist.getBudgetexpenditureIncurred().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getBudgetexpenditureIncurred() !=null && chlist.getBudgetexpenditureIncurred().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                    
												                </div>
												              </div>
												              
												              <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Remarks</label>
												                   
                              		      							<textarea class="form-control form-control fs15px" name="BudgetRemark4" maxlength="255" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getBudgetRemark4()!=null) {%><%=chlist.getBudgetRemark4() %><%} %></textarea> 
                              		      							
												                </div>
												              </div>
												              
												              
												            
												            </div>  
												              
												              <div class="checklistpage text-center">
												             
												             
												             <% if(chlist!=null && chlist.getCRBringFrom()!=null) {%>
												                    
												                    <button class="btn-warning edit btn" type="submit"  name="Action" value="Edit" onclick="return confirm('Are You Sure To Update')">UPDATE</button>
												             <%}else{ %>
												             
													                <button class="btn btn-info btn-sm success submit"  name="Action"  <% if(chlist!=null){ %> value="Edit" <%} else {%> value="Add" <%} %>onclick="return confirm('Are You Sure To Submit')">SUBMIT</button>
													                
													                <%} %>
	            							                </div>
	            							         
												   <br>
												    
												     <div class="pagin pagination-display"> 
																
																	
																	<div class="pagination">
																			
																			<div class="page-item">
																				<button class="page-link" type="button" id="secondpage1"  >1</button>
																			</div>
																			
																			
																			<div class="page-item">
																				<button class="page-link" type="button" id="secondpage2" >2</button>
																			</div>
																			
																			<div class="page-item">
																				<button class="page-link" type="button" id="secondpage3" >3</button>
																			</div>
																			
																	</div>
																
															 </div> 
												    
												    
												    
												    </div> 
												    
												    
												     <div class="" id="thirdpage">  
												        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
												    	<input type="hidden" name="closureId" value="<%=closureId%>">    
												      
												         <div class="col-md-4" >
												        		<div class="form-group">
												                	<label class="control-label black-color"><%=++count %>. Utilization of Equipment</label>
												                </div>
												        </div>
												            
												        <br>
												        <br> 
												        
												      <div class="row ml2-mr2">
												          
												          <div class="col-md-4" >
												                 <div class="form-group">
												                	<label class="control-label">Log book maintained in r/o high cost equipment</label><span class="mandatory">*</span>
												                    <input class="form-control" type="text" name="LogBookMaintained" value="<% if(chlist!=null && chlist.getLogBookMaintained()!=null) {%> <%=StringEscapeUtils.escapeHtml4(chlist.getLogBookMaintained())%><%}%>">
												                    
												                </div>
												              </div>   
												              
												              <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Job cards maintained</label><span class="mandatory">*</span>
												                  
												                     <select class="form-control w-50" data-width="100%" data-live-search="true" name="JobCardsMaintained" >
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getJobCardsMaintained() !=null && chlist.getJobCardsMaintained().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getJobCardsMaintained() !=null && chlist.getJobCardsMaintained().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getJobCardsMaintained() !=null && chlist.getJobCardsMaintained().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                    
												                    
												                </div>
												              </div> 
												              
												              <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Remarks</label>
												                   
                              		      							<textarea class="form-control form-control fs15px" name="UtilizationRemark1" maxlength="255" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getUtilizationRemark1()!=null) {%><%=chlist.getUtilizationRemark1() %><%} %></textarea> 
                              		      							
												                </div>
												              </div>
												                 
												          
												          </div>
												          
												          <hr>
												          
												          <div class="col-md-4" >
												        		<div class="form-group">
												                	<label class="control-label black-color"><%=++count %>. Staff Position</label>
												                </div>
												        </div> 
												            
												        <br>
												        <br> 
												          
												     <div class="row ml2-mr2">      
												         <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Demanded as per Q.P.R</label><span class="mandatory">*</span>
												                    <select class="form-control w-50" data-width="100%" data-live-search="true" name="SPdemand" id="spdemand">
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getSPdemand() !=null && chlist.getSPdemand().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getSPdemand() !=null && chlist.getSPdemand().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getSPdemand() !=null && chlist.getSPdemand().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                    
												                    
												                </div>
												          </div> 
												          
												          
												           <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Remarks</label>
												                   
                              		      							<textarea class="form-control form-control fs15px" name="StaffRemark1" maxlength="255" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getStaffRemark1()!=null) {%><%=chlist.getStaffRemark1() %><%} %></textarea> 
                              		      							
												                </div>
												              </div>
												          
												          
												          
												           <div class="col-md-4 dis-none"  id="spactualposition">
												                 <div class="form-group">
												                	<label class="control-label">Actual position-held</label><span class="mandatory">*</span>
												                    
                              		      						<input  class="form-control" name="SPActualposition"   value="<% if(chlist!=null && chlist.getSPActualposition()!=null) {%><%=StringEscapeUtils.escapeHtml4(chlist.getSPActualposition()) %><%}%>" >
                              		      							
												                </div>
												          </div> 
												          
												          
												          
												           <div class="col-md-4 dis-none"  id="spgeneralspecific">
												                 <div class="form-group">
												                	<label class="control-label">General Specific (Category wise)</label><span class="mandatory">*</span>
												                    
                              		      					            <input  class="form-control" name="SPGeneralSpecific"   value="<% if(chlist!=null && chlist.getSPGeneralSpecific()!=null) {%><%=StringEscapeUtils.escapeHtml4(chlist.getSPGeneralSpecific()) %><%}%>" >
                              		      							
												                </div>
												          </div> 
												          
												          
												      </div> 
												      
												      <hr>
												      
												       <div class="col-md-4" >
												        		<div class="form-group">
												                	<label class="control-label black-color"><%=++count %>.Civil Works</label>
												                </div>
												        </div> 
												            
												        <br>
												        <br> 
												          
												         <div class="row ml2-mr2">      
												         <div class="col-md-6" >
												                 <div class="form-group">
												                	<label class="control-label">Civil works are included in the estimated prepared before project sanction.</label><span class="mandatory">*</span> 												                    
												                    <select class="form-control w-50" data-width="100%" data-live-search="true" name="CWIncluded" id="cwincluded">
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getCWIncluded() !=null && chlist.getCWIncluded().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getCWIncluded() !=null && chlist.getCWIncluded().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getCWIncluded() !=null && chlist.getCWIncluded().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                    
												                </div>
												          </div> 
												          
												           <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Remarks</label>
												                   
                              		      							<textarea class="form-control form-control fs15px" name="CWRemark1" maxlength="255" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getCWRemark1()!=null) {%><%=chlist.getCWRemark1() %><%} %></textarea> 
                              		      							
												                </div>
												              </div>
												          
												          
												          
												          
												           <div class="col-md-4"  id="cwadminapp">
												                 <div class="form-group">
												                	<label class="control-label">Admin approval is accorded for the work.</label><span class="mandatory">*</span>
												                    <select class="form-control w-50" data-width="100%" data-live-search="true" name="CWAdminApp" >
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getCWAdminApp() !=null && chlist.getCWAdminApp().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getCWAdminApp() !=null && chlist.getCWAdminApp().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getCWAdminApp() !=null && chlist.getCWAdminApp().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                    
												                </div>
												          </div> 
												          
												          
												          
												          <div class="col-md-7"  id="cwminorworks">
												                 <div class="form-group">
												                	<label class="control-label">Minor works are completed within the financial year and not costing more than one lakh.</label><span class="mandatory">*</span>
												                    
												                     <select class="form-control w-50" data-width="100%" data-live-search="true" name="CWMinorWorks" >
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getCWMinorWorks() !=null && chlist.getCWMinorWorks().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getCWMinorWorks() !=null && chlist.getCWMinorWorks().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getCWMinorWorks() !=null && chlist.getCWMinorWorks().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                    
												                </div>
												          </div> 
												          
												          
												           <div class="col-md-7"  id="cwrevenueworks">
												                 <div class="form-group">
												                	<label class="control-label">Revenue major works are completed within the financial year and not costing more than two lakhs.</label><span class="mandatory">*</span>
												                    
												                    <select class="form-control w-50" data-width="100%" data-live-search="true" name="CWRevenueWorks" >
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getCWRevenueWorks() !=null && chlist.getCWRevenueWorks().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getCWRevenueWorks() !=null && chlist.getCWRevenueWorks().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getCWRevenueWorks() !=null && chlist.getCWRevenueWorks().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                    
												                </div>
												          </div> 
												          
												          
												           <div class="col-md-4"  id="cwdeviation">
												                 <div class="form-group">
												                	<label class="control-label">There are no deviations from the  admin   approval.</label><span class="mandatory">*</span>												                    
												                     <select class="form-control w-50" data-width="100%" data-live-search="true" name="CWDeviation" >
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getCWDeviation() !=null && chlist.getCWDeviation().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getCWDeviation() !=null && chlist.getCWDeviation().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getCWDeviation() !=null && chlist.getCWDeviation().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                </div>
												          </div> 
												         
												          <div class="col-md-7"  id="cwexpenditure">
												                 <div class="form-group">
												                	<label class="control-label">Expenditure is not incurred just for the sake of exhausting funds at the end of Project.</label><span class="mandatory">*</span> 												                    
												                     <select class="form-control w-50" data-width="100%" data-live-search="true" name="CWExpenditure" >
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getCWExpenditure() !=null && chlist.getCWExpenditure().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getCWExpenditure() !=null && chlist.getCWExpenditure().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getCWExpenditure() !=null && chlist.getCWExpenditure().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
												                </div>
												          </div> 
												          
												      </div>   
												      
												      <hr>
												      
												      <div class="col-md-4" >
												        		<div class="form-group">
												                	<label class="control-label black-color"><%=++count %>.Vehicles &emsp; <input type="checkbox" id="vehicle" name="VehicleChecked" <%if (chlist!=null && !chlist.getNoOfVehicleSanctioned().isEmpty()){ %> checked <%} %> ></label>
												                	
												                </div>
												        </div> 
												            
												        <br>
												        <br> 
												      
												         <div class="row ml2-mr2">      
												          <div class="col-md-3" >
												                 <div class="form-group">
												                	<label class="control-label">No. of vehicles sanctioned in the project </label><span class="mandatory">*</span>
												                    <input class="form-control" type="text" name="NoOfVehicleSanctioned"  placeholder="No Of Vehicle Sanctioned" id="NoOfVehicleSanctioned"
												                    value="<% if(chlist!=null && chlist.getNoOfVehicleSanctioned()!=null) {%><%=StringEscapeUtils.escapeHtml4(chlist.getNoOfVehicleSanctioned())%><%}%>" >
												                    
												                </div>
												          </div> 
												          
												          <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Vehicle type.</label>
												                    <input class="form-control" type="text" name="VehicleType"  placeholder="Enter Vehicle Type"  id="VehicleType"
												                    value="<% if(chlist!=null && chlist.getVehicleType()!=null) {%><%=StringEscapeUtils.escapeHtml4(chlist.getVehicleType())%><%}%>" >
												                    
												                </div>
												          </div> 
												          
												          
												          
												          <div class="col-md-3" >
												                 <div class="form-group">
												                	<label class="control-label">Average monthly run of each vehicle.</label><span class="mandatory">*</span>
												                    <input  class="form-control" type="text" name="VehicleAvgRun"  placeholder="Enter Average monthly run of each vehicle"  
												                     value="<% if(chlist!=null && chlist.getVehicleAvgRun()!=null){ %><%=StringEscapeUtils.escapeHtml4(chlist.getVehicleAvgRun()) %><%} %>" >
												                    
												                </div>
												          </div> 
												          
												          
												          <div class="col-md-4" >
												                 <div class="form-group">
												                	<label class="control-label">Average monthly fuel consumption of each vehicle.</label><span class="mandatory">*</span>
                                                                     <input class="form-control" type="text" name="VehicleAvgFuel" id="VehicleAvgFuel" placeholder="Enter Average monthly fuel consumption of each vehicle" 
												                     value="<%if(chlist!=null && chlist.getVehicleAvgFuel()!=null){%><%=StringEscapeUtils.escapeHtml4(chlist.getVehicleAvgFuel())%><%}%>" >
										                    
												                </div>
												          </div> 
												          
												         </div>
												         
												         <hr>
												         
												         <div class="col-md-4" >
											        		<div class="form-group">
											                	<label class="control-label black-color"><%=++count %>. If the project is closed</label>
											                </div>
												        </div> 
												            
												        <br>
												        <br>
												        
												        <div class="row ml2-mr2">      
												          <div class="col-md-3" >
												                 <div class="form-group">
												                	<label class="control-label">When the project finally closed</label><span class="mandatory">*</span>
												                     <input  class="form-control" type="text" name="ProjectClosedDate" id="ProjectClosedDate" placeholder="Enter Project Closed Date" 
												                     value="<% if(chlist!=null && chlist.getProjectClosedDate()!=null){ %><%=fc.SqlToRegularDate(chlist.getProjectClosedDate()) %><%} %>" >
												                     
												                </div>
												          </div> 
												          
												          <div class="col-md-4" >
												                 <div class="form-group">
												                	<label class="control-label">Project closures Report send to R&D HQrs.(Mention Dated)</label><span class="mandatory">*</span>
												                    <input  class="form-control " type="text" name="ReportDate" id="ClosureReportDate" placeholder="" 
												                    value="<% if(chlist!=null && chlist.getReportDate()!=null){ %><%=fc.SqlToRegularDate(chlist.getReportDate()) %><%} %>" >

												                    
												                </div>
												          </div> 
												          
												          
												          <div class="col-md-4" >
												                 <div class="form-group">
												                	<label class="control-label">If undue delay in sending the Closure Report, reasons thereof.</label><span class="mandatory">*</span>
                                                                     <input  class="form-control " type="text" name="ProjectDelayReason" maxlength="3000" placeholder="If undue delay in sending the Closure Report, reasons thereof" 
												                     value="<% if(chlist!=null && chlist.getDelayReason()!=null){ %><%=StringEscapeUtils.escapeHtml4(chlist.getDelayReason()) %><%} %>" >												                    
												                </div>
												          </div> 
												          
												           <div class="col-md-4" >
												                 <div class="form-group">
												                	<label class="control-label">Whether  the  stated  objectives achieved.</label><span class="mandatory">*</span>
                                                                     <select class="form-control w-50" data-width="100%" data-live-search="true" name="CRObjective" >
	                                                                             <option value="0" selected disabled >--Select--</option>
	                                                                             <option value="Yes" <% if(chlist!=null &&  chlist.getCRObjective() !=null && chlist.getCRObjective().toString().equalsIgnoreCase("Yes")){%> selected <%}%> >Yes</option>
                                                                                 <option  value="No" <% if(chlist!=null &&  chlist.getCRObjective() !=null && chlist.getCRObjective().toString().equalsIgnoreCase("No")){%> selected <%}%> >No</option>
                                                                                 <option  value="N/A" <% if(chlist!=null &&  chlist.getCRObjective() !=null && chlist.getCRObjective().toString().equalsIgnoreCase("N/A")){%> selected <%}%> >N/A</option>
                                                                       </select>
                           										 </div>
												           </div>
												           
												            <div class="col-md-2" >
												                 <div class="form-group">
												                	<label class="control-label">Remarks</label>
												                   
                              		      							<textarea class="form-control form-control fs15px" name="ProjectRemark1" maxlength="255" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><% if(chlist!=null && chlist.getProjectRemark1()!=null) {%><%=chlist.getProjectRemark1() %><%} %></textarea> 
                              		      							
												                </div>
												              </div>
												                
												            <div class="col-md-3" >
												                 <div class="form-group">
												                	<label class="control-label">Any other spin-off achieved.</label><span class="mandatory">*</span>
                                                                    <input class="form-control" type="text" name="CRspinoff"  value="<% if(chlist!=null && chlist.getCRspinoff()!=null) {%><%=StringEscapeUtils.escapeHtml4(chlist.getCRspinoff()) %><%}%>" maxlength="3000"> 
                                                                    											                    
												                </div>
												           </div>  
												           
												           <div class="col-md-7" >
												                 <div class="form-group">
												                	<label class="control-label">Reason, if PDC not  meet (Delay in  convening of TPC or  delayed placement of indent by the user)</label><span class="mandatory">*</span>
                                                                    <input class="form-control" type="text" name="PDCNotMeetReason" value="<% if(chlist!=null && chlist.getCRReason()!=null){%><%=StringEscapeUtils.escapeHtml4(chlist.getCRReason())%><%}%>" maxlength="3000">
                                                                    											                    
												                </div>
												           </div>  
												             
												               <div class="col-md-5" >
												                 <div class="form-group">
												                	<label class="control-label">Reason, if Cost Over-run</label><span class="mandatory">*</span>
                                                                    <textarea class="form-control form-control fs15px" name="CRcostoverin" maxlength="3000" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><%if(chlist!=null && chlist.getCRcostoverin()!=null){%><%=chlist.getCRcostoverin()%><%}%></textarea> 											                    
												                </div>
												           </div>  
												           
												           
												           <div class="col-md-8" >
												                 <div class="form-group">
												                	<label class="control-label">Non-consumable items returned to main stores on nominal voucher (No credit to be given in Project expenditure  card)</label><span class="mandatory">*</span>
                                                                      <input class="form-control" name="NonConsumableItemsReturned"   value="<%if(chlist!=null && chlist.getNonConsumableItemsReturned()!=null){%><%=StringEscapeUtils.escapeHtml4(chlist.getNonConsumableItemsReturned())%><%}%>"  > 
                                                                    
                                                                    											                    
												                </div>
												           </div> 
												           
												            
												            <div class="col-md-8" >
												                 <div class="form-group">
												                	<label class="control-label">Consumable (non-consumed) returned to main store on Issue voucher (Credit to be given in Project Expenditure Card)</label><span class="mandatory">*</span>
                                                                     <input  class="form-control" name="ConsumableItemsReturned"   value="<%if(chlist!=null && chlist.getConsumableItemsReturned()!=null){%><%=StringEscapeUtils.escapeHtml4(chlist.getConsumableItemsReturned())%><%}%>" >
                                                                    
                                                                    											                    
												                </div>
												           </div> 
												           
												                
												              <div class="col-md-7" >
												                 <div class="form-group">
												                	<label class="control-label">How the manpower sanctioned in the Project has been disposed of (Permanent as well as temporary)</label><span class="mandatory">*</span>
                                                                    
                              		      							   <input  class="form-control" name="ManPowerSanctioned"   value="<%if(chlist!=null && chlist.getManPowerSanctioned()!=null){%><%=StringEscapeUtils.escapeHtml4(chlist.getManPowerSanctioned())%><%}%>" >
                              		      						</div>
												                
												                 <div class="form-group">
												                	<label class="control-label">Overall Review Remarks/Recommendations </label><span class="mandatory">*</span>
                                                                    <textarea class="form-control form-control fs15px" name="OverAllReason" maxlength="3000" rows="1" cols="100" 
                              		  								 placeholder="Enter Reason" ><%if(chlist!=null && chlist.getRemarks()!=null){%><%=chlist.getRemarks()%><%}%></textarea> 											                    
												                </div>
												             </div>  
												        </div> 
												    
														     <div class="checklistpage text-center">
														     
														             <% if(chlist!=null && chlist.getSPActualposition()!=null && !chlist.getSPActualposition().isEmpty()) { %>
												                    
												                           <button class="btn-warning edit btn" type="submit" id="" name="Action" value="Edit" onclick="return confirm('Are You Sure To Update')">UPDATE</button>
												                    
												                     <%} else{ %>
												             
													                         <button class="btn btn-info btn-sm success submit" id="secondpagechange" name="Action"  <% if(chlist!=null){ %> value="Edit" <%} else {%> value="Add" <%} %>onclick="return confirm('Are You Sure To Submit')">SUBMIT</button>
													                 <%} %>
														      </div> 
													</form> 
												    
												    <br>
												    
												    <div class="pagin pagination-display"> 
																   <div class="pagination">
																			
																			<div class="page-item">
																				<button class="page-link" type="button" id="thirdpage1" >1</button>
																			</div>
																			<div class="page-item">
																				<button class="page-link" type="button" id="thirdpage2" >2</button>
																			</div>
																			
																			<div class="page-item">
																				<button class="page-link" type="button" id="thirdpage3" >3</button>
																			</div>
																	</div>
															    </div> 
															</div>	 
												    </div> 
												</div>
											</div>
               							</div>
               						</div>
               					</div>
               					<div class="disflex-juscontent">
               						<div></div>
		               				
               					</div>
               					
               			<%if(chlistTabId!=null && chlistTabId.equalsIgnoreCase("1")){ %> 
         					</div>
         				<%}else{ %>
              				</div>
               			<%} %>
               			
               		</div>
               	</div>
              </div>
          
         		
	

<script type="text/javascript">
	


$('#PDCDate,#SCRequested,#SCGranted,#PDCGranted,#PDCRequested,#PDCRevised,#HQrsSentDate,#CFASendDate,#ProposedDate,#CFASendDate,#ProjectClosedDate,#ClosureReportDate').daterangepicker({
	"singleDatePicker" : true,
	"linkedCalendars" : false,
	"showCustomRangeLabel" : true,
	"cancelClass" : "btn-default",
	showDropdowns : true,
	locale : {
		format : 'DD-MM-YYYY'
	}
});	


$(document).ready(function() {
	
	 $('#CSReason').hide();
	 $('#CSDrawn').hide();
	 
    $('#select1').on('change', function() {
    var selectedValue = $(this).val();
    if(selectedValue=="PurchasedDirectly"){
    	
    	 $('#CSDrawn').hide();
    	 $('#CSReason').show();
    }
    else{
    	 $('#CSReason').hide();
    	 $('#CSDrawn').show();
    }
     if(selectedValue=="PurchasedDirectly"){
    	$('#CSReason').attr('required', true);
    } 
 });
    
    if ($("#select1").val() == 'PurchasedDirectly') {
	         $('#CSDrawn').hide();
        	 $('#CSReason').show();
	
     }else if($("#select1").val() == 'ThroughMainStream'){
    	 $('#CSReason').hide();
    	 $('#CSDrawn').show();
    }
    
    
    $('#spdemand').on('change', function() {
        var selectedValue = $(this).val();
        if(selectedValue=="Yes"){
        	 $('#spactualposition').show();
        	 $('#spgeneralspecific').show();
        }
        else{
        	 $('#spactualposition').hide();
        	 $('#spgeneralspecific').hide();
        }
    });
    
    
    if ($("#spdemand").val() == 'Yes') {
    	
    	$('#spactualposition').show();
   	    $('#spgeneralspecific').show();

    }else{
		   $('#spactualposition').hide();
		   $('#spgeneralspecific').hide();
		}
  });


$(document).ready(function() {
	
	 $('#NCSReason').hide();
	 $('#NCSDrawn').hide();
	 
   $('#select2').on('change', function() {
   var selectedValue = $(this).val();
   if(selectedValue=="PurchasedDirectly"){
   	
   	 $('#NCSDrawn').hide();
   	 $('#NCSReason').show();
   	
   }
   else {
	   	 $('#NCSReason').hide();
	   	 $('#NCSDrawn').show();
   		
   }
    if(selectedValue=="PurchasedDirectly"){
   	  $('#NCSReason').attr('required', true);
    } 
   
 });
   
   
   
   if ($("#select2").val() == 'PurchasedDirectly') {
	   
		 $('#NCSDrawn').hide();
	   	 $('#NCSReason').show();
	   
   }else if($("#select2").val() == 'ThroughMainStream'){
	   
	     $('#NCSReason').hide();
	   	 $('#NCSDrawn').show();
   }
  
});

$(document).ready(function() {
   $('#CRUpload').hide();
   
   $('#select3').on('change', function() {
	   var selectedValue = $(this).val();
	   if(selectedValue=="DOC"){
	   	
		   $('#CRUpload').show();
	   	
	   }
	   else {
		   $('#CRUpload').hide();
	   }
	    if(selectedValue=="DOC"){
	   	  $('#CRUpload').attr('required', true);
	    } 
	   
	 });
   if ($("#select3").val() == 'DOC' ) {
       
  	 $('#CRUpload').show();

    }else if($("#select3").val() == 'DOC'){
	   $('#CRUpload').hide();
	
   }
   
});


$(document).ready(function() {
	   $('#BudgetDocUpload').hide();
	   
	   $('#select4').on('change', function() {
		   var selectedValue = $(this).val();
		   if(selectedValue=="DOC"){
		   	
			   $('#BudgetDocUpload').show();
		   	
		   }
		   else {
			   $('#BudgetDocUpload').hide();
		   }
		    if(selectedValue=="DOC"){
		   	  $('#BudgetDocUpload').attr('required', true);
		    } 
		   
		 });
	   if ($("#select4").val() == 'DOC') {
	       
	  	 $('#BudgetDocUpload').show();

	    }else if($("#select4").val() == 'DOC'){
		   $('#BudgetDocUpload').hide();
		
	   }
	   
	});
 
 
$(document).ready(function() {
	
	$('#EquipReason').hide();
	
$("#checkbox").on('change', function() {
	if($(this).val()== "Yes"){
		
       $('#EquipReason').show();
     	 
    }else{
    	$('#EquipReason').hide();
    }
  });
   
	if ($("#checkbox").val()== 'Yes') {
		$('#EquipReason').show();
		
	}else{
		$('#EquipReason').hide();
		
	}
 });


$(document).ready(function() {
	
	$('#EquipProcuredBeforePDCAttach').hide();
	
$("#checkbox1").on('change', function() {
	if($(this).val() == 'Yes'){
    	
    	 $('#EquipProcuredBeforePDCAttach').show();
     }else{
    	
    	$('#EquipProcuredBeforePDCAttach').hide();
    }
  });
   
   
if ($("#checkbox1").val() == 'Yes') {
	   $('#EquipProcuredBeforePDCAttach').show();
	
	}else{
		$('#EquipProcuredBeforePDCAttach').hide();
	}
 });



$(document).ready(function() {
	
	$('#EquipBoughtOnChargereason').hide();
	
$("#checkbox2").on('change', function() {
	
    if($(this).val() == 'Yes'){
    	
    	 $('#EquipBoughtOnChargereason').show();
    }else{
    	
    	$('#EquipBoughtOnChargereason').hide();
    }
 });
   
if ($("#checkbox2").val() == 'Yes') {
	
	$('#EquipBoughtOnChargereason').show();
	
}else{
	   $('#EquipBoughtOnChargereason').hide();
	}
	
 $("#cwincluded").on('change', function() {
	
    if($(this).val() == 'Yes'){
    	
    	 $('#cwadminapp').show();
    	 $('#cwminorworks').show();
    	 $('#cwrevenueworks').show();
    	 $('#cwdeviation').show();
    	 $('#cwexpenditure').show();
     }else{
    	
    	$('#cwadminapp').hide();
    	$('#cwminorworks').hide();
    	$('#cwrevenueworks').hide();
    	$('#cwdeviation').hide();
    	$('#cwexpenditure').hide(); 
    }
  });
   
if ($("#cwincluded").val() == 'Yes') {
	
	 $('#cwadminapp').show();
	 $('#cwminorworks').show();
	 $('#cwrevenueworks').show();
	 $('#cwdeviation').show();
	 $('#cwexpenditure').show();
	 
}else{
		
		$('#cwadminapp').hide();
    	$('#cwminorworks').hide();
    	$('#cwrevenueworks').hide();
    	$('#cwdeviation').hide();
    	$('#cwexpenditure').hide();
	}
  
$('#hqrssenddate').change(function() {
    if ($(this).is(':checked')) {
    	
    	 $('#HQrsSentDate').prop('disabled', false);
         $('#HQrsSentDate').data('daterangepicker').setStartDate(moment());
         $('#HQrsSentDate').data('daterangepicker').setEndDate(moment());
         $('#HQrsSentDate').val(moment().format('DD-MM-YYYY'));
        
    } else {
        // If the checkbox is not checked, set the input field to 'NA'
        $('#HQrsSentDate').val('NA');
        $('#HQrsSentDate').prop('disabled', true);
    }
});


	if (!$('#hqrssenddate').is(':checked')) {
	
	 $('#HQrsSentDate').val('NA');
	 $('#HQrsSentDate').prop('disabled', true);
	 
	}else{
		
		$('#hqrssenddate').prop('checked', true);
		$('#HQrsSentDate').prop('disabled', false);
	}
	
	 $('#CFASend').change(function() {
		    if ($(this).is(':checked')) {
		    	
		    	 $('#CFASendDate').prop('disabled', false);
		         $('#CFASendDate').data('daterangepicker').setStartDate(moment());
		         $('#CFASendDate').data('daterangepicker').setEndDate(moment());
		         $('#CFASendDate').val(moment().format('DD-MM-YYYY'));
		    	 
		        //$('#HQrsSentDate').val(currentDate);
		    } else {
		        // If the checkbox is not checked, set the input field to 'NA'
		        $('#CFASendDate').val('NA');
		        $('#CFASendDate').prop('disabled', true);
		    }
		});
	 
	 
	 if (!$('#CFASend').is(':checked')) {
			
		 $('#CFASendDate').val('NA');
		 $('#CFASendDate').prop('disabled', true);
		 
		}else{
			
			$('#CFASend').prop('checked', true);
			$('#CFASendDate').prop('disabled', false);
		}
	 
	 
	 $('#vehicle').change(function() {
		    if ($(this).is(':checked')) {
		    	$('#selectall').show();
		    } else {
		        
		    	$('#selectall').hide();
		    }
		});
	 
	 if (!$('#vehicle').is(':checked')) {
			
		    $('#selectall').hide();
		  
		}else{
			$('#selectall').show();
		}
		
	 
	 
	 $('#RevSancCost').change(function() {
		    if ($(this).is(':checked')) {
		    	$('#selectRevSancCost').show();
		    } else {
		        
		    	$('#selectRevSancCost').hide();
		    }
		});
	 
	 if (!$('#RevSancCost').is(':checked')) {
			
		    $('#selectRevSancCost').hide();
		  
		}else{
			$('#selectRevSancCost').show();
		}
	 
	 
	 $('#RevPDCCost').change(function() {
		    if ($(this).is(':checked')) {
		    	$('#selectRevPDCCost').show();
		    } else {
		        
		    	$('#selectRevPDCCost').hide();
		    }
		});
	 
	 if (!$('#RevPDCCost').is(':checked')) {
			
		    $('#selectRevPDCCost').hide();
		  
		}else{
			$('#selectRevPDCCost').show();
		}
	 
     });
     

$(document).ready(function() {
	
	
	$('#secondpage').hide();
	$('#thirdpage').hide();
	$('#firstpage1').css('background-color', '#40A2E3');
	
/* 	$("#firstpagechange,#firstpagechanges").on('click', function() {
		
		
		$('#firstpage').hide();
		$('#secondpage').show();
		$('#thirdpage').hide();
		
		$('#firstpagesubmit').submit();
		
	}); */
	
	
$("#firstpage2,#thirdpage2").on('click', function() {
		
		$('#firstpage').hide();
		$('#secondpage').show();
		$('#thirdpage').hide();
		$('#secondpage2').css('background-color', '#40A2E3');
		
});
	
     $("#firstpage3,#secondpage3").on('click', function() {
		
			$('#firstpage').hide();
			$('#secondpage').hide();
			$('#thirdpage').show();
			$('#thirdpage3').css('background-color', '#40A2E3');
		
	});
     
     
     $("#secondpage1,#thirdpage1").on('click', function() {
    	 
    	        $('#firstpage').show();
				$('#secondpage').hide();
				$('#thirdpage').hide();
				$('#firstpage1').css('background-color', '#40A2E3');
	}); 
	
	
 /*     $("#backtosecondpage,#backtosecondpages").on('click', function() {
    	 
    	 
	   	    $('#firstpage').hide();
			$('#secondpage').show();
			$('#thirdpage').hide();
	 
	 
});  */
     
     
	
});

</script>





<script type="text/javascript">
		/* button disabling for chlist Approval */
		<%if((chlist!=null && chlistforward.contains(closure.getClosureStatusCode())) || chlist==null) {%>
		$('.btn-chlist').prop('disabled',false);
		<%} else{%>
		$('.btn-chlist').prop('disabled',true);
		<%} %>
		
		/* tabs hiding for chlist approval */
		<%if(isApproval!=null && (isApproval.equalsIgnoreCase("Y") || isApproval.equalsIgnoreCase("N"))) {%>
		   $('.navigation_btn').hide();
		   $('#nav-chlistdetails').hide();
		<%} %>

$(document).ready(function() {
	
	<%------------------cloning for Revision in sanctioned cost -------------------------------------%>
    

    $("#tablesancrev").on('click','.btn_add_sancrev' ,function() {
        var $tr = $('.tr_clone_trialresults').last('.tr_clone_trialresults');
        var $clone = $tr.clone();
        
        $clone.find("input").val("").end();
    	$clone.find('#SCRequested,#SCGranted').daterangepicker({
    		"singleDatePicker" : true,
    		"linkedCalendars" : false,
    		"showCustomRangeLabel" : true,
    		"cancelClass" : "btn-default",
    		showDropdowns : true,
    		locale : {
    			format : 'DD-MM-YYYY'
    		}
    	});
    	
        $tr.after($clone);

    });

    $("#tablesancrev").on('click','.btn_rem_sancrev' ,function() {
        var $rows = $('.tr_clone_trialresults');

        if ($rows.length > 1) {
            var $rowToRemove = $(this).closest('.tr_clone_trialresults');
            var indexToRemove = $rows.index($rowToRemove);

            
            $rowToRemove.remove();
            
            $('.tr_clone_trialresults').each(function(index, row) {
                var $currentRow = $(row);
             });
        }
    });
    
});

$(document).ready(function() {
    <%------------------cloning for Revision in PDC -------------------------------------%>
    
    $("#tablepdcrev").on('click','.btn_add_pdcrev' ,function() {
        var $tr = $('.tr_clone_results').last('.tr_clone_results');
        var $clone = $tr.clone();
        
        $clone.find("input").val("").end();
    	$clone.find('#PDCRequested,#PDCGranted,#PDCRevised').daterangepicker({
    		"singleDatePicker" : true,
    		"linkedCalendars" : false,
    		"showCustomRangeLabel" : true,
    		"cancelClass" : "btn-default",
    		showDropdowns : true,
    		locale : {
    			format : 'DD-MM-YYYY'
    		}
    	});
    	
        $tr.after($clone);

    });

    $("#tablepdcrev").on('click','.btn_rem_pdcrev' ,function() {
        var $rows = $('.tr_clone_results');

        if ($rows.length > 1) {
            var $rowToRemove = $(this).closest('.tr_clone_results');
            var indexToRemove = $rows.index($rowToRemove);

            
            $rowToRemove.remove();
            
            $('.tr_clone_results').each(function(index, row) {
                var $currentRow = $(row);
             });
        }
    });
    
});



</script>

</body>
</html>