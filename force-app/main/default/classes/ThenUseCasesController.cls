public with sharing class ThenUseCasesController
{
	@AuraEnabled
	public static String executeApex(String message)
	{
		return 'Apex invoked! ';
	}
}
