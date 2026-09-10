<%@page import="com.vts.pfms.FormatConverter"%>
<%@page import="com.vts.pfms.pfts.dto.PmmgPmsDmdDetails"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<jsp:include page="../static/header.jsp"></jsp:include>
</head>
<body>
<%
	List<PmmgPmsDmdDetails> pmmgPmsDmdDetails = (List<PmmgPmsDmdDetails>)request.getAttribute("pmmgPmsDmdDetails");
	FormatConverter fc = new FormatConverter();
%>

	<div class="container-fluid">
		<div class="col-md-12">
			<div class="card shadow-nohover">
				<div class="card-header">
					<div class="row">
						<div class="col-md-3">
							<h4>
								<b>Procurement List</b>
							</h4>
						</div>
					</div>
				</div>
				
				<div class="card-body">
					<div class="table-responsive">
						<table class="table table-bordered table-hover table-striped table-condensed dataTable" id="myTable" >
							<thead class="center">
								<tr>
									<th>Demand No</th>
									<th>Demand Date</th>
									<th>Project Code</th>
									<th>Item Name</th>
									<th>SO No</th>
									<th>SO Date</th>
									<th>DP Date</th>
									<th>Firm Name</th>
									<th>Proc. Stage</th>
								</tr>
							</thead>
							<tbody>
								<%
								int slno = 0;
								for (PmmgPmsDmdDetails dmd : pmmgPmsDmdDetails) { %>
									<tr class="center">
										<td><%=dmd.getDemandNo() %></td>
										<td><%=dmd.getDemandDate()!=null ? fc.SqlToRegularDate(dmd.getDemandDate()) : "-" %></td>
										<td><%=dmd.getProjectCode() %></td>
										<td class="left"><%=dmd.getItemName() %></td>
										<td><%=dmd.getSoNo() %></td>
										<td><%=dmd.getSoDate()!=null ? fc.SqlToRegularDate(dmd.getSoDate()) : "-" %></td>
										<td><%=dmd.getDpDate()!=null ? fc.SqlToRegularDate(dmd.getDpDate()) : "-" %></td>
										<td class="left"><%=dmd.getFirmName() %></td>
										<td><%=dmd.getProcurementStage() %></td>
									</tr>
								<% } %>
							</tbody>
						</table>
					</div>

				</div>
				
			</div>
		</div>
	</div>			
</body>
	<script type="text/javascript">
	
		$(document).ready(function() {
	       $('#myTable').DataTable({
	           "lengthMenu": [10, 25, 50, 75, 100],
	           "pagingType": "simple",
	           "pageLength": 10
	       });
		});
	</script>	
</html>