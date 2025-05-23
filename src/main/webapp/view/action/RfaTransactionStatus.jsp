<%@page import="java.util.stream.Collectors"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"  import="java.util.*,java.text.SimpleDateFormat"%>
 
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>RFA Transaction Status</title>
<jsp:include page="../static/header.jsp"></jsp:include>

<style type="text/css">


  html, body {
    margin: 0;
    padding: 0;
    font-family: Helvetica, sans-serif;
  }
  body {
    background: #25303B;
  }
  section#timeline {
    width: 80%;
    margin: 20px auto;
    position: relative;
  }
  section#timeline:before {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: 0;
    margin: 0 0 0 -1px;
    width: 2px;
    height: 100%;
    background:black;
  }
  section#timeline article {
    width: 100%;
    margin: 0 0 20px 0;
    position: relative;
  }
  section#timeline article:after {
    content: '';
    display: block;
    clear: both;
  }
  section#timeline article div.inner {
    width: 40%;
    float: left;
    margin: 5px 0 0 0;
    border-radius: 6px;
  }
  section#timeline article div.inner span.date {
    display: block;
    width: 70px;
    height: 65px;
    padding: 5px 0;
    position: absolute;
    top: 0;
    left: 50%;
    margin: 0 0 0 -32px;
    border-radius: 100%;
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
    background: #25303B;
    color: rgba(255,255,255,255);
   /*  border: 2px solid rgba(255,255,255,0.2); */
    box-shadow: 0 0 0 7px #5c6166;
  }
  section#timeline article div.inner span.date span {
    display: block;
    text-align: center;
  }
  section#timeline article div.inner span.date span.day {
    font-size: 12px;
  }
  section#timeline article div.inner span.date span.month {
    font-size: 13px;
  }
  section#timeline article div.inner span.date span.year {
    font-size: 9px;
  }
  section#timeline article div.inner h2 {
    padding: 10px;
    margin: 0;
    color: #fff;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0px;
    border-radius: 6px 6px 0 0;
    position: relative;
    font-family: 'Muli',sans-serif;
    height: 31px;
  }
  section#timeline article div.inner h2:after {
    content: '';
    position: absolute;
    top: 19px;
    right: -5px;
      width: 10px; 
      height: 10px;
    -webkit-transform: rotate(-45deg);
  }
  section#timeline article div.inner p {
    
    padding-top:5px;
    padding-left:15px;
    padding-bottom:10px;
    margin: 0;
    font-size: 14px;
    background: #fff;
    color: #656565;
    border-radius: 0 0 6px 6px;
    font-family: 'Lato',sans-serif;
  }
  section#timeline article:nth-child(2n+2) div.inner {
    float: right;
  }
  section#timeline article:nth-child(2n+2) div.inner h2:after {
    left: -5px;
  }
  section#timeline article:nth-child(odd) div.inner h2 {
   background-color: var(--my-color-var);
  }
  section#timeline article:nth-child(odd) div.inner h2:after {
   background-color: var(--my-color-var);
  }
  section#timeline article:nth-child(even) div.inner h2 {
   background-color: var(--my-color-var);
  }
  section#timeline article:nth-child(even) div.inner h2:after {
    background: var(--my-color-var);
  }
/* timeline customization */

.remarks_title{
	font-size: 12px;
	font-weight: 800;
	color:black;
}
#scrollclass::-webkit-scrollbar {
	width: 7px;
}

#scrollclass::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	border-radius: 5px;
}

#scrollclass::-webkit-scrollbar-thumb {
	border-radius: 5px;
	/*   -webkit-box-shadow: inset 0 0 6px black;  */
	background-color: gray;
}

#scrollclass::-webkit-scrollbar-thumb:hover {
	-webkit-box-shadow: inset 0 0 6px black;
	transition: 0.5s;
}

#scrollclass::-webkit-scrollbar {
	width: 7px;
}

#scrollclass::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	border-radius: 5px;
}

#scrollclass::-webkit-scrollbar-thumb {
	border-radius: 5px;
	/*   -webkit-box-shadow: inset 0 0 6px black;  */
	background-color: gray;
}

#scrollclass::-webkit-scrollbar-thumb:hover {
	-webkit-box-shadow: inset 0 0 6px black;
	transition: 0.5s;
}
</style>

</head>
<body>
<%
List<Object[]> statuslist = (List<Object[]>)request.getAttribute("RfaTransactionList");
String rfaNo = statuslist.get(0)[1].toString();
String currentStatus = statuslist.get(statuslist.size()-1)[9].toString();
String actionDate = statuslist.get(statuslist.size()-1)[5].toString();
List<String>forwardList=statuslist.stream().filter(e->e[9].toString().equalsIgnoreCase("AV"))
									.map(e->e[10].toString())
									.distinct() 
									.collect(Collectors.toList());
	
%>

<div>
	    <h3 align="center" style="color: #9C27B0;font-weight: 600">RFA Transaction of <%=rfaNo %></h3>
	</div>
<div class="page card dashboard-card" style="height:80vh;overflow:auto;" id="scrollclass;">
	<section id="timeline">
		<% int count=1;
	       	 SimpleDateFormat month=new SimpleDateFormat("MMM");
			 SimpleDateFormat day=new SimpleDateFormat("dd");
			 SimpleDateFormat year=new SimpleDateFormat("yyyy");
			 SimpleDateFormat time=new SimpleDateFormat("HH:mm");
			 String status="";
			 for(Object[] object:statuslist){
				 if(status.equalsIgnoreCase("AV") && status.equalsIgnoreCase(object[9].toString())){
					status="AV";
					 continue;
					 }else if (status.equalsIgnoreCase("RFR") && status.equalsIgnoreCase(object[9].toString())){
						 status="RFR";
						 continue; 
					 }
		%>
	      <article>
		  	<div class="inner" style="box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;">
				<span class="date">
					<span class="day"><%=day.format(object[5]) %></span>
					<span class="month"><%=month.format(object[5]) %></span>
					<span class="year"><%=year.format(object[5]) %></span>
				</span>
				<%if(currentStatus.equalsIgnoreCase(object[9].toString()) && actionDate.equalsIgnoreCase(object[5].toString()) && !currentStatus.equalsIgnoreCase("ARC")){ %>
				<h2 style="background-color:red;--my-color-var: red" ><%=object[7]%> at <%=time.format(object[5]) %></h2>
				<%}else{%>
				<h2 style="background-color:green;--my-color-var: green" ><%=object[7]%> at <%=time.format(object[5]) %></h2>
				<%}%>
				<%-- <h2 style="background-color:<%=object[8]%>;--my-color-var: <%=object[8]%>" ><%=object[7]%> at <%=time.format(object[5]) %></h2> --%> 
				<p style="background-color:  #f0f2f5;">
					<span class="remarks_title">Action By : </span>
					<%=object[3] %>, <%=object[4] %><br>
					<%if(object[6]!= null) { %>
						<span class="remarks_title">Remarks : </span>
							<%=object[6] %>
					<%}else{ %> 
						<span class="remarks_title">No Remarks </span> 
					<%} %>
					<br>
					<%if(object[2].equals(object[11])){ %>
					  
				   <% }else{%>
				     <span class="remarks_title">Forwarded To : </span>
					<%if(object[9].toString().equalsIgnoreCase("AV") || object[9].toString().equalsIgnoreCase("RFR") ){ %>
					 <%=forwardList.toString().replace("[", "").replace("]", "") %>
					<%}else{ %>
					   <%=object[10] %>
					<%} %>
				   <%} %>
				</p>
			 </div>
		 </article>
		<%count++;
		  status=object[9].toString();
	    }%> 		
	</section>	
</div>
</body>
</html>