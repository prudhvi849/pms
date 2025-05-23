<%@page import="com.ibm.icu.text.DecimalFormat"%>
<%@page import="com.vts.pfms.NFormatConvertion"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1" import="java.util.*,com.vts.*,java.text.SimpleDateFormat"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<jsp:include page="../static/header.jsp"></jsp:include>
<%-- <jsp:include page="../static/sidebar.jsp"></jsp:include> --%>
<title>GROUP MASTER EDIT</title>
<style type="text/css">

label{
font-weight: bold;
  font-size: 13px;
}

.table thead tr th {
	background-color: aliceblue;
	text-align: left;
	width:30%;
}

.table thead tr td {

	text-align: left;
}

label{
	font-size: 15px;
}




</style>
</head>
<body>

<%


List<Object[]> groupheadlist=(List<Object[]>)request.getAttribute("groupheadlist");
List<Object[]> tdaddlist=(List<Object[]>)request.getAttribute("tdaddlist");
Object[] groupsdata=(Object[])request.getAttribute("groupsdata");


%>

<%String ses=(String)request.getParameter("result"); 
 String ses1=(String)request.getParameter("resultfail");
	if(ses1!=null){
	%>
	
	
	<center>
	
	<div class="alert alert-danger" role="alert">
                     <%=ses1 %>
                    </div></center>
	<%}if(ses!=null){ %>
	<center>
	<div class="alert alert-success" role="alert" >
                     <%=ses %>
            </div>
            
    </center>
    
    
                    <%} %>


<div id="ajaxError" style="display: none;">
    <div align="center">
        <div class="alert-danger" id="ajaxErrorMessage" style="width: 65%; padding: 10px; margin: 5px 0; 
              border-radius: 4px;">
            <!-- Error message will appear here -->
        </div>
    </div>
</div>
	
<br>	
	
<div class="container-fluid">		
<div class="row"> 


<div class="col-sm-2"></div> 
	
 <div class="col-sm-8"  style="top: 10px;">
<div class="card shadow-nohover"  >
<div class="card-header" style=" background-color: #055C9D;margin-top: ">
                    <b class="text-white">Group Master Edit</b>
        		</div>
<div class="card-body">


<form name="myfrm" action="GroupMasterEditSubmit.htm" id="editCheck" method="POST" >

 <div class="row"> 
                		
                    		<div class="col-md-3">
                        		<div class="form-group">
                            		<label class="control-label">Group Code</label><span class="mandatory">*</span>
                              		<input  class="form-control form-control "  type="text" name="groupcode" readonly="readonly" id="groupCode" value="<%=groupsdata[1]%>" required="required" maxlength="3" style="font-size: 15px;"> 
                        		</div>
                    		</div>
         					<div class="col-md-3">
                        		<div class="form-group">
                            		<label class="control-label">Group Name</label><span class="mandatory">*</span>
                            		<input  class="form-control form-control " value="<%=groupsdata[2] %>"  type="text" name="groupname" id="groupName" required="required" maxlength="100" style=" font-size: 15px;text-transform: capitalize; width: 90%;" > 
                        		</div>
                    		</div>
                    		<div class="col-md-4">
                        		<div class="form-group">
                            		<label class="control-label">Group Head Name</label><span class="mandatory">*</span>
                              		<select class="custom-select" name="ghempid"  required="required" id ="ghempid" style="font-size: 18px;">
													<option disabled="true"  selected value="">---Select---</option>
													
													<% for (  Object[] obj : groupheadlist){ %>
											
													<option value=<%=obj[0]%> <%if(obj[0].toString().equalsIgnoreCase(groupsdata[3].toString())) {%> selected="selected" <%} %>><%=obj[1]%>, <%=obj[2] %> </option>
												
													<%} %>
									</select>
                        		</div>
                    		</div>
                    		<div class="col-md-4">
                        		<div class="form-group">
                            		<label class="control-label">TD Name</label><span class="mandatory">*</span>
                              		<select class="custom-select" name="tdId"  required="required" id ="tdId" style="font-size: 18px;">
													<option disabled="true"  selected value="">---Select---</option>
													
													<% for (  Object[] obj : tdaddlist){ %>
											
											        	<option value=<%=obj[0]%> <%if(obj[0].toString().equalsIgnoreCase(groupsdata[7].toString())) {%> selected="selected" <%} %>><%=obj[1] %> (<%=obj[2] %>)</option>
												
													<%} %>
									</select>
                        		</div>
                    		</div>
                    			<div class="col-md-2">
                        		<div class="form-group">
                            		<label class="control-label">isActive:</label><span class="mandatory">*</span>
                              		 
								<select  class="custom-select"  name="isActive" required="required" maxlength="255" style="font-size: 18px;" >
                       
                       
                     <option value="1" <%if(groupsdata[6].toString().equalsIgnoreCase("1")) {%> selected="selected" <%} %> >YES</option>
                       
					 <option value="0" <%if(groupsdata[6].toString().equalsIgnoreCase("0")) {%> selected="selected" <%} %> >NO</option>
                      
    </select> 
                        		</div>
                    		</div>
                    		        		
                        </div>    
    

	<div align="center">
		<button type="submit" class="btn btn-sm submit" style="align-self: center;" onclick="return confirm('Are you Sure To Submit ?');" >SUBMIT</button>&nbsp;&nbsp;
		<a class="btn  btn-sm  back"    href="GroupMaster.htm">BACK</a>
	</div>

	<input type="hidden" name="groupid"  value="<%=groupsdata[0] %>" />
	<input type="hidden" name="${_csrf.parameterName}"	value="${_csrf.token}"  />
	
	
</form>
	
	
	  </div>
	  </div>
	  </div>
	 
	 <div class="col-sm-2"></div> 
	 
	  </div>
	
</div>	
	
</body>
<script>
  $(document).ready(function(){
	  $('#ghempid').select2();
	  $('#tdId').select2();
  });
  


  $(document).ready(function() {
	    $('select[name="isActive"]').change(function() {
	        var isActive = $(this).val();
	        var groupCode = $('#groupCode').val();
	        var groupId = $('input[name="groupid"]').val(); // Get the hidden groupid
	        
	        $('#ajaxError').hide();
	        $('#ajaxErrorMessage').text('');
	        
	        if(isActive === "0") {
	            $.ajax({
	                url: 'GroupMasterEditSubmitCheck.htm',
	                type: 'POST',
	                data: {
	                    isActive: isActive,
	                    groupcode: groupCode,  
	                    groupid: groupId,     
	                    '${_csrf.parameterName}': '${_csrf.token}'
	                },
	                success: function(response) {
	                    if(response.valid) {
	                        console.log("Validation passed");
	                    } else {
	                        $('#ajaxErrorMessage').text(response.message);
	                        $('#ajaxError').show();
	                        $('select[name="isActive"]').val("1");
	                    }
	                },
	                error: function(xhr) {
	                    $('#ajaxErrorMessage').text("Error validating status");
	                    $('#ajaxError').show();
	                    $('select[name="isActive"]').val("1");
	                }
	            });
	        }
	    });
	});
</script>
</html>