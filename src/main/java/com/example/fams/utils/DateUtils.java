package com.example.fams.utils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public final class DateUtils {
    public static final String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String DATE_FORMAT_2 = "yyyy-MM-dd";

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_FORMAT);
    private static final DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern(DATE_FORMAT_2);

    public static LocalDateTime toDateTime(String date) {
        return LocalDateTime.parse(date, formatter);
    }

    public static LocalDate toDate(String date) {
        return LocalDate.parse(date, formatter2);
    }

    public static String toString(LocalDateTime date) {
        return date.format(formatter);
    }
}
