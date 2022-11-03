package com.project.barista101.data;

public enum ERoles {
    ROLE_USER("USER"),
    ROLE_ADMIN("ADMIN");

    public final String label;

    private ERoles(String label) {
        this.label = label;
    }
}
