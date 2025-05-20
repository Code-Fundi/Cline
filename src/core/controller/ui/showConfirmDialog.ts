import vscode from "vscode"
import { Controller } from ".."
import { ShowConfirmDialogRequest } from "../../../shared/proto/ui"
import { String } from "../../../shared/proto/common"

/**
 * Shows a confirmation dialog with custom buttons
 * @param controller The controller instance
 * @param request The request containing dialog options
 * @returns Dialog response with the selected button
 */
export async function showConfirmDialog(controller: Controller, request: ShowConfirmDialogRequest): Promise<String> {
	try {
		// Extract button options from the request
		const { message, modal, buttons, metadata } = request

		// Show the dialog with VSCode's native API
		const selectedButton = await vscode.window.showWarningMessage(message, { modal: modal ?? true }, ...buttons)

		// Return the selected button or empty string if cancelled
		return {
			value: selectedButton || "",
		}
	} catch (error) {
		console.error("Error in showConfirmDialog:", error)
		return {
			value: "",
		}
	}
}
