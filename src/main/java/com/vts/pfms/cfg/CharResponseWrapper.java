package com.vts.pfms.cfg;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletResponseWrapper;

import java.io.CharArrayWriter;
import java.io.PrintWriter;

public class CharResponseWrapper extends HttpServletResponseWrapper {

    private final CharArrayWriter charWriter = new CharArrayWriter();

    public CharResponseWrapper(HttpServletResponse response) {
        super(response);
    }

    @Override
    public PrintWriter getWriter() {
        return new PrintWriter(charWriter);
    }

    public String getCaptureAsString() {
        return charWriter.toString();
    }
}
